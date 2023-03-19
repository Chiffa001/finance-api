import { IsInt, IsString, Min } from 'class-validator';

export class CreateAccountDto {
  @IsString()
    name: string;

  @Min(1)
  @IsInt()
    currencyId: number;
}
