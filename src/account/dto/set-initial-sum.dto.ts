import { Min, IsNumber } from 'class-validator';

export class SetInitialSumDto {
  @IsNumber()
  @Min(0)
    sum: number;
}
