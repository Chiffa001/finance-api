import { ContainerModule, interfaces } from 'inversify';

import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';

import { Modules } from '~/modules';

export const authModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<AuthGuard>(Modules.AuthGuard).to(AuthGuard).inSingletonScope();
  bind<RoleGuard>(Modules.RoleGuard).to(RoleGuard).inSingletonScope();
});
