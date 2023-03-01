import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { BcryptUtil } from '../utils/bcrypt.util';
import { JwtUtil } from '../utils/jwt.util';
import { ModelNotFoundException } from '../exceptions/model-not-found.exception';

@Injectable()
export class UserService {
  constructor(
    @Inject(BcryptUtil) private bcryptUtil: BcryptUtil,
    @Inject(JwtUtil) private jwtUtil: JwtUtil,
  ) {}

  async checkDoubleRecord(_arguments: Record<string, any>) {
    const checkExists = await UserEntity.findOne({
      where: {
        ..._arguments,
      },
    });

    if (checkExists)
      throw new HttpException('Double record', HttpStatus.CONFLICT);
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, ...user } = createUserDto;
    const hash = await this.bcryptUtil.hash(password);

    await this.checkDoubleRecord({ login: createUserDto.login });

    return await UserEntity.create({
      ...user,
      hash,
      role: 1,
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

  async findOne(id: number, role = [1]): Promise<UserEntity> {
    const model = await UserEntity.findOne({
      attributes: ['id', 'name', 'login', 'role'],
      where: {
        id,
        role,
      },
    });

    if (!model) throw new ModelNotFoundException(UserEntity, id);

    return model;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const model = await this.findOne(id);

    const { password, ...data } = updateUserDto;

    if (updateUserDto.login && model.login != updateUserDto.login)
      await this.checkDoubleRecord({ login: updateUserDto.login });

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
