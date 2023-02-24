import { ContainerModule, interfaces } from 'inversify';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { Modules } from '~/modules';

export const usersModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UsersController>(Modules.UsersController).to(UsersController);
  bind<UsersService>(Modules.UsersService).to(UsersService);
});
