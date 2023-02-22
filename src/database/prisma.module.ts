import { ContainerModule, interfaces } from 'inversify';

import { PrismaService } from './prisma.service';

import { Modules } from '~/modules';

export const prismaModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<PrismaService>(Modules.PrismaService).to(PrismaService).inSingletonScope();
});
