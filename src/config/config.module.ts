import { ContainerModule, interfaces } from 'inversify';

import { ConfigService } from './config.service';

import { Modules } from '~/modules';
import { Config } from '~/types/config';

export const configModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<Config>(Modules.ConfigService).to(ConfigService).inSingletonScope();
});
