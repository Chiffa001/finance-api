import { ContainerModule, interfaces } from 'inversify';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

import { Modules } from '~/modules';

export const categoriesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<CategoriesService>(Modules.CategoriesService).to(CategoriesService);
  bind<CategoriesController>(Modules.CategoriesController).to(CategoriesController);
});
