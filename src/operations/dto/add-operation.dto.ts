import { OperationType } from '@prisma/client';
import { IsNumber, IsPositive } from 'class-validator';

export class AddOperationDto {
  @IsPositive()
  @IsNumber()
    sum: number;

  @IsNumber()
    categoryId: number;

  @IsNumber()
    accountId: number;

  operationType?: OperationType;

  text?: string;
}
