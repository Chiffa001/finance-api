import { Container } from 'inversify';

import { usersModule } from './users';

import { accountModule } from '~/account';
import { App, appModule } from '~/app';
import { clientErrorModule } from '~/client-error';
import { configModule } from '~/config';
import { prismaModule } from '~/database';
import { loggerModule } from '~/logger';
import { Modules } from '~/modules';

const bootstrap = async () => {
  const appContainer = new Container();
  appContainer.load(appModule, accountModule, loggerModule, clientErrorModule, configModule, prismaModule, usersModule);

  const app = appContainer.get<App>(Modules.App);
  await app.init();
};

bootstrap().catch(() => { console.log('Fatal Error'); });
