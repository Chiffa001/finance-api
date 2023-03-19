import { UserModel } from '@prisma/client';
import { compare } from 'bcryptjs';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';

import { LoginUserDto } from './dto/login-user.dto';
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
  readonly moduleName = 'UsersService';
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

    return this.prismaService.client.userModel.create({
      data: candidate
    });
  };

  login = async ({ email, password }: LoginUserDto) => {
    const user = await this.prismaService.client.userModel.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      return null;
    }

    const isPasswordVerified = await compare(password, user.password);

    if (!isPasswordVerified) {
      return null;
    }

    const token = sign({ email, id: user.id, role: user.role, iat: Math.floor(Date.now() / 1000) - 30 }, this.configService.get('SECRET'));

    this.logger.info(`[${this.moduleName}] login: ${JSON.stringify({ email, token })}`);

    return { token };
  };

  isUserExist = async (email: string) => {
    const isUserExist = !!(await this.prismaService.client.userModel.findFirst({ where: { email } }));
    this.logger.info(`[${this.moduleName}] isUserExist: ${JSON.stringify({ email, isUserExist })}`);
    return isUserExist;
  };
}
