import { CategoryType } from '@prisma/client';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
    name: string;

  @IsEnum(CategoryType)
  @IsOptional()
    type?: CategoryType;
}
