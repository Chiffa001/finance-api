import { ContainerModule, interfaces } from 'inversify';

import { LoggerService } from './logger.service';

import { Modules } from '~/modules';
import { Logger } from '~/types/logger';

export const loggerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<Logger>(Modules.Logger).to(LoggerService).inSingletonScope();
});
