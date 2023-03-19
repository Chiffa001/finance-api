import { inject, injectable } from 'inversify';

import { CreateCurrencyDto } from './dto/create-currency.dto';

import { PrismaService } from '~/database';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';

@injectable()
export class CurrencyService {
  readonly moduleName: 'CurrencyService';
  constructor (@inject(Modules.Logger) private readonly logger: Logger, @inject(Modules.PrismaService) private readonly prismaService: PrismaService) {}

  async create ({ code }: CreateCurrencyDto) {
    const currency = await this.prismaService.client.currencyModel.create({
      data: {
        code
      }
    });
    this.logger.info(`[${this.moduleName}] ${JSON.stringify(currency)} added`);
    return currency;
  }

  async getAll () {
    const currencyList = await this.prismaService.client.currencyModel.findMany();
    this.logger.info(`[${this.moduleName}] get ${JSON.stringify(currencyList)}`);
    return currencyList;
  }
}
