import { inject, injectable } from 'inversify';

import { CreateAccountDto } from './dto/create-account.dto';

import { PrismaService } from '~/database';
import { Modules } from '~/modules';
import 'reflect-metadata';

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

  async createAccount (userId: number, { name, currency }: CreateAccountDto) {
    return this.prismaService.client.accountModel.create({
      data: {
        userModelId: userId,
        name,
        currency
      }
    });
  }
}
