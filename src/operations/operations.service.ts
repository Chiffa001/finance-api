import { inject, injectable } from 'inversify';

import { AddOperationDto } from './dto/add-operation.dto';
import { OperationEntity } from './operation.entity';

import { CommentsService } from '~/comments';
import { PrismaService } from '~/database';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';

@injectable()
export class OperationsService {
  readonly moduleName = 'OperationsService';
  constructor (@inject(Modules.Logger) private readonly logger: Logger, @inject(Modules.PrismaService) private readonly prismaService: PrismaService, @inject(Modules.CommentsService) private readonly commentsService: CommentsService) {}

  async getLastOperation (accountId: number) {
    const lastOperation = await this.prismaService.client.operationModel.findFirst({
      where: {
        accountModelId: accountId
      },
      orderBy: {
        createdAt: 'asc'
      },
      take: -1
    });

    this.logger.info(`[${this.moduleName}] lastOperation: ${JSON.stringify(lastOperation)}`);

    return lastOperation;
  }

  async getOperationsByAccountId (accountId: number, take = 10, skip = 0) {
    const [total, operations] = await this.prismaService.client.$transaction([
      this.prismaService.client.operationModel.count({ where: { accountModelId: accountId } }),
      this.prismaService.client.operationModel.findMany({
        where: { accountModelId: accountId },
        take,
        skip,
        orderBy: { createdAt: 'desc' },
        include: {
          comment: true
        }
      })
    ]);

    const result = { total: total ?? 0, operations };

    this.logger.info(`[${this.moduleName}] [getOperationsByAccountId]: ${JSON.stringify({
      args: { accountId, take, skip },
      result
    })}`);

    return result;
  }

  async add ({ accountId, categoryId, sum, operationType, text }: AddOperationDto) {
    const operation = new OperationEntity(sum, accountId, categoryId, operationType);

    const lastOperation = await this.getLastOperation(operation.accountId);

    operation.setBalance(lastOperation?.balance ?? 0);

    let comment = null;
    if (text) {
      comment = await this.commentsService.create({ text });
      this.logger.info(`[${this.moduleName}] comment: ${JSON.stringify(comment)}`);
    }

    const newOperation = await this.prismaService.client.operationModel.create({
      data: {
        accountModelId: operation.accountId,
        sum: operation.sum,
        balance: operation.balance,
        categoryModelId: operation.categoryId,
        type: operation.type,
        commentModelId: comment?.id ?? null
      }
    });

    this.logger.info(`[${this.moduleName}] newOperation: ${JSON.stringify(newOperation)}`);

    return newOperation;
  }
}
