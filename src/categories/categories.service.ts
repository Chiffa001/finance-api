import { CategoryType } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { CreateCategoryDto } from './dto/create-category.dto';

import { PrismaService } from '~/database';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';

@injectable()
export class CategoriesService {
  constructor (@inject(Modules.PrismaService) private readonly prismaService: PrismaService, @inject(Modules.Logger) private readonly logger: Logger) {}

  async create (userId: number, { name, type }: CreateCategoryDto) {
    const category = await this.prismaService.client.categoryModel.create({ data: { name, userModelId: userId, type } });
    this.logger.info(`[CategoriesService] category created: ${JSON.stringify(category)}`);
    return category;
  };

  async getAll (userId: number, type: CategoryType = 'EXPENSE') {
    const categories = await this.prismaService.client.categoryModel.findMany({
      where: { userModelId: userId, type },
      select: {
        id: true, name: true, type: true
      }
    });
    this.logger.info(`[CategoriesService] all categories: ${JSON.stringify(categories)}`);
    return categories;
  }
}
