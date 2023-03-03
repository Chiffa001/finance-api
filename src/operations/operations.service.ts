import { inject, injectable } from 'inversify';

import { AddOperationDto } from './dto/add-operation.dto';
import { OperationEntity } from './operation.entity';

import { PrismaService } from '~/database';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';

@injectable()
export class OperationsService {
  constructor (@inject(Modules.Logger) private readonly logger: Logger, @inject(Modules.PrismaService) private readonly prismaService: PrismaService) {}

  async add ({ accountId, categoryId, sum, operationType }: AddOperationDto) {
    const operation = new OperationEntity(sum, accountId, categoryId, operationType);

    const lastOperation = await this.prismaService.client.operationModel.findFirst({
      where: {
        accountModelId: operation.accountId
      }
    });

    operation.setBalance(lastOperation?.balance ?? 0);

    const newOperation = await this.prismaService.client.operationModel.create({
      data: {
        accountModelId: operation.accountId,
        sum: operation.sum,
        balance: operation.balance,
        categoryModelId: operation.categoryId,
        type: operation.type
      }
    });

    return newOperation;
  }
}
