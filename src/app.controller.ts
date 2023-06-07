import { Controller, Get } from '@nestjs/common';
import { UserTestEntity } from './user-test/entities/user-test.entity';

@Controller()
export class AppController {
  @Get('app')
  async load() {
    const data = await UserTestEntity.findAll({
      where: {
        test_id: [1, 2, 3, 4, 5, 8, 11, 12],
      },
    });

    data.map((el) => {
      const fails = el.result.points.filter((el) => el == 0).length;
      // console.log(fails);
      // el.result.addition = {
      //   fails,
      // };
      el.update(
        {
          result: {
            ...el.result,
            addition: { fails },
          },
        },
        { where: { id: el.id } },
      );
    });

    // readXlsxFile(process.cwd() + '/' + 'excel.xlsx').then((rows) => {
    //   PvkEntity.bulkCreate(
    //     rows.map((item) => ({
    //       name: item[1],
    //       description: item[2],
    //     })),
    //   );
    // });
  }
}

//
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOjIsImlhdCI6MTY3NzQwMjE5NywiZXhwIjoxNjc5OTk0MTk3fQ.xJrxkO3Yx56ek91zE7wZ2-8BMlAOFyGNrJHNJIKl7sE
