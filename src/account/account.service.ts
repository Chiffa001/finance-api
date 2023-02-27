import { inject, injectable } from 'inversify';

import 'reflect-metadata';
import { PrismaService } from '~/database';
import { Modules } from '~/modules';

@injectable()
export class AccountService {
  constructor (@inject(Modules.PrismaService) private readonly prismaService: PrismaService) {}
  getInfo () {
    return 'account info';
  }

  async getAllAccounts (userId: number) {
    return this.prismaService.client.accountModel.findMany({
      where: {
        userModelId: userId
      }
    });
  }
}
