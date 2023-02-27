import { ContainerModule, interfaces } from 'inversify';

import { AuthGuard } from './auth.guard';

import { Modules } from '~/modules';

export const authModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<AuthGuard>(Modules.AuthGuard).to(AuthGuard).inSingletonScope();
});
