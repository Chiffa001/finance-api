import { ContainerModule, interfaces } from 'inversify';

import { ClientError } from './client-error';

import { Modules } from '~/modules';

export const clientErrorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ClientError>(Modules.ClientError).to(ClientError);
});
