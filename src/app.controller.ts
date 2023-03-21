import { Controller, Get } from '@nestjs/common';
import readXlsxFile from 'read-excel-file/node';
import { PvkEntity } from './pvk/entities/pvk.entity';

@Controller()
export class AppController {
  @Get('app')
  load() {
    readXlsxFile(process.cwd() + '/' + 'excel.xlsx').then((rows) => {
      PvkEntity.bulkCreate(
        rows.map((item) => ({
          name: item[1],
          description: item[2],
        })),
      );
    });
  }
}

//
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOjIsImlhdCI6MTY3NzQwMjE5NywiZXhwIjoxNjc5OTk0MTk3fQ.xJrxkO3Yx56ek91zE7wZ2-8BMlAOFyGNrJHNJIKl7sE
