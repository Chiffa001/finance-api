import { Container } from 'inversify';

import { accountModule } from '~/account';
import { App, appModule } from '~/app';
import { authModule } from '~/auth';
import { categoriesModule } from '~/categories';
import { clientErrorModule } from '~/client-error';
import { configModule } from '~/config';
import { prismaModule } from '~/database';
import { loggerModule } from '~/logger';
import { Modules } from '~/modules';
import { operationsModule } from '~/operations';
import { usersModule } from '~/users';

const bootstrap = async () => {
  const appContainer = new Container();
  appContainer.load(appModule, accountModule, loggerModule, clientErrorModule, configModule, prismaModule, usersModule, authModule, categoriesModule, operationsModule);

  const app = appContainer.get<App>(Modules.App);
  await app.init();
};

bootstrap().catch(() => { console.log('Fatal Error'); });
