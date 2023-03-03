import { ContainerModule, interfaces } from 'inversify';

import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';

import { Modules } from '~/modules';

export const operationsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<OperationsService>(Modules.OperationsService).to(OperationsService);
  bind<OperationsController>(Modules.OperationsController).to(OperationsController);
});
