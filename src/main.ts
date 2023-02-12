import { Container } from 'inversify';

import { accountModule } from '~/account';
import { App, appModule } from '~/app';
import { loggerModule } from '~/logger';
import { Modules } from '~/modules';

const bootstrap = async () => {
  const appContainer = new Container();
  appContainer.load(appModule, accountModule, loggerModule);

  const app = appContainer.get<App>(Modules.App);
  await app.init();
};

bootstrap().catch(() => { console.log('Fatal Error'); });
