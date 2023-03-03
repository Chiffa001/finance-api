import { ContainerModule, interfaces } from 'inversify';

import { CommentsService } from './comments.service';

import { Modules } from '~/modules';

export const commentsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<CommentsService>(Modules.CommentsService).to(CommentsService);
});
