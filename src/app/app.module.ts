import { ContainerModule, interfaces } from 'inversify';

import { App } from './app';

import { Modules } from '~/modules';

export const appModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(Modules.App).to(App);
});
