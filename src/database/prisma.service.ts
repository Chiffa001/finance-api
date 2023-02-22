import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { Modules } from '~/modules';
import { Logger } from '~/types/logger';

import 'reflect-metadata';

@injectable()
export class PrismaService {
  private readonly _client: PrismaClient;
  constructor (@inject(Modules.Logger) private readonly logger: Logger) {
    this._client = new PrismaClient();
  }

  async connect () {
    try {
      await this._client.$connect();
      this.logger.info('[PrismaService] Подключение к БД прошло успешно');
    } catch (e) {
      this.logger.error('[PrismaService] При подключении к БД произошла ошибка: ' + (e as Error).message);
      throw e;
    }
  }

  async disconnect () {
    try {
      await this._client.$disconnect();
      this.logger.info('[PrismaService] Отключение от БД прошло успешно');
    } catch (e) {
      this.logger.error('[PrismaService] При отключении от БД произошла ошибка: ' + (e as Error).message);
      throw e;
    }
  }
}
