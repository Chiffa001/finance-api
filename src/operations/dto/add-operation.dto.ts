import { OperationType } from '@prisma/client';
import { IsNumber, IsPositive, IsOptional, IsEnum, IsString } from 'class-validator';

export class AddOperationDto {
  @IsPositive()
  @IsNumber()
    sum: number;

  @IsNumber()
    categoryId: number;

  @IsNumber()
    accountId: number;

  @IsEnum(OperationType)
  @IsOptional()
    operationType?: OperationType;

  @IsString()
  @IsOptional()
    text?: string;
}
