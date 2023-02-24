import { config, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';

import { Modules } from '~/modules';
import { Config } from '~/types/config';
import { Logger } from '~/types/logger';

import 'reflect-metadata';

@injectable()
export class ConfigService implements Config {
  private readonly _config: DotenvParseOutput;

  constructor (@inject(Modules.Logger) private readonly logger: Logger) {
    const conf = config();

    if (conf.error) {
      this.logger.error('Не удалось считать config');
      return;
    }

    this.logger.info('Config успешно прочитан');
    this._config = conf.parsed as DotenvParseOutput;
  }

  get = (key: string) => this._config[key];
}
