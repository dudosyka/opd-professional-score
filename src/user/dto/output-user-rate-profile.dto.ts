import OutputPvkDto from '../../pvk/dto/output-pvk.dto';
import OutputProfessionDto from '../../profession/dto/output-profession.dto';

export class OutputPvkRate {
  pvk: OutputPvkDto;
  value: number;
}

export class OutputProfRate {
  prof: { name: string; id: number };
  value: number;
}

export class OutputUserRateProfileDto {
  pvk: OutputPvkRate[];
  prof: OutputProfRate[];
}
