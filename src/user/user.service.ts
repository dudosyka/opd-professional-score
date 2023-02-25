import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { BcryptUtil } from '../utils/bcrypt.util';
import { JwtUtil } from '../utils/jwt.util';

@Injectable()
export class UserService {
  constructor(
    @Inject(BcryptUtil) private bcryptUtil: BcryptUtil,
    @Inject(JwtUtil) private jwtUtil: JwtUtil,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, ...user } = createUserDto;
    const hash = await this.bcryptUtil.hash(password);

    const checkExists = await UserEntity.findOne({
      where: {
        login: user.login,
      },
    });

    if (checkExists)
      throw new HttpException('Double record', HttpStatus.CONFLICT);

    return await UserEntity.create({
      ...user,
      hash,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await UserEntity.findAll({
      attributes: ['id', 'name', 'login', 'role'],
      where: {
        role: 1,
      },
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    const model = await UserEntity.findOne({
      attributes: ['name', 'login', 'role'],
      where: {
        id,
        role: 1,
      },
    });

    if (!model) throw new NotFoundException();

    return model;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const model = await this.findOne(id);

    const { password, ...data } = updateUserDto;

    const hash = await this.bcryptUtil.hash(password);

    await model.update({
      ...data,
      hash,
    });

    return model;
  }

  async remove(id: number) {
    const model = await this.findOne(id);

    await model.destroy();

    return true;
  }

  async validate(login: string, password: string) {
    const model = await UserEntity.findOne({
      where: {
        login,
      },
    });

    if (!model) return null;

    const hash = model.hash;

    if (await this.bcryptUtil.compare(password, hash)) {
      return model;
    } else {
      return null;
    }
  }

  auth(user: UserEntity) {
    return this.jwtUtil.sign(user);
  }

  hashStr(str: string) {
    return Promise.resolve(this.bcryptUtil.hash(str));
  }
}
