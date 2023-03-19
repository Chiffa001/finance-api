import { inject, injectable } from 'inversify';

import { CreateAccountDto } from './dto/create-account.dto';

import { PrismaService } from '~/database';
import { Modules } from '~/modules';
import { OperationsService } from '~/operations';
import 'reflect-metadata';

@injectable()
export class AccountService {
  constructor (@inject(Modules.PrismaService) private readonly prismaService: PrismaService, @inject(Modules.OperationsService) private readonly operationsService: OperationsService) {}

  async getAllAccounts (userId: number) {
    const accounts = await this.prismaService.client.accountModel.findMany({
      where: {
        userModelId: userId
      },
      select: {
        id: true,
        name: true,
        currency: true
      }
    });

    return Promise.all(accounts.map(async (account) => {
      const lastOperation = await this.operationsService.getLastOperation(account.id);

      return {
        ...account,
        balance: lastOperation?.balance ?? 0
      };
    }));
  }

  async createAccount (userId: number, { name, currencyId }: CreateAccountDto) {
    return this.prismaService.client.accountModel.create({
      data: {
        userModelId: userId,
        name,
        currencyModelId: currencyId
      }
    });
  }
}
