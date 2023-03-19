import { IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
    code: string;
}
