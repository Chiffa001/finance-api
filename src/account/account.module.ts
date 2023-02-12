import { ContainerModule, interfaces } from 'inversify';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';

import { Modules } from '~/modules';

export const accountModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<AccountController>(Modules.AccountController).to(AccountController);
  bind<AccountService>(Modules.AccountService).to(AccountService);
});
