import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from './user.entity';

import { PrismaService } from '~/database';
import { Modules } from '~/modules';
import { Config } from '~/types/config';
import { Logger } from '~/types/logger';
import { User } from '~/types/user';

import 'reflect-metadata';

@injectable()
export class UsersService implements User {
  constructor (
    @inject(Modules.ConfigService) private readonly configService: Config,
    @inject(Modules.Logger) private readonly logger: Logger,
    @inject(Modules.PrismaService) private readonly prismaService: PrismaService) {}

  register = async ({ email, name, password }: RegisterUserDto): Promise<UserModel> => {
    const user = new UserEntity(email, name);

    await user.setPassword(password, +this.configService.get('SALT'));
    const candidate = {
      email: user.email,
      name: user.name,
      password: user.password
    };

    this.logger.info(`[UsersService] register: ${JSON.stringify({ candidate })}`);

    return await this.prismaService.client.userModel.create({
      data: candidate
    });
  };
}
