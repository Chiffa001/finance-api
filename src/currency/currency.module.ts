import { ContainerModule, interfaces } from 'inversify';

import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';

import { Modules } from '~/modules';

export const currencyModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<CurrencyService>(Modules.CurrencyService).to(CurrencyService);
  bind<CurrencyController>(Modules.CurrencyController).to(CurrencyController);
});
