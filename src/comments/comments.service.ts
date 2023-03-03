import { inject, injectable } from 'inversify';

import { CreateCommentDto } from './dto/create-comment-dto';

import { PrismaService } from '~/database';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';

@injectable()
export class CommentsService {
  readonly moduleName = 'CommentsService';
  constructor (@inject(Modules.PrismaService) private readonly prismaService: PrismaService, @inject(Modules.Logger) private readonly logger: Logger) {}

  async create ({ text }: CreateCommentDto) {
    const comment = await this.prismaService.client.commentModel.create({
      data: {
        text
      }
    });
    this.logger.info(`[${this.moduleName}] ${JSON.stringify(comment)} added`);
    return comment;
  }
}
