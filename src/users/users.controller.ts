import { inject, injectable } from 'inversify';

import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';

import { BaseController } from '~/common/base-controller';
import { ValidateMiddleware } from '~/common/validate.middleware';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';
import { ControllerHandler, Route } from '~/types/route';

import 'reflect-metadata';

enum RoutePath {
  REGISTER = '/register',
  LOGIN = '/login'
}

@injectable()
export class UsersController extends BaseController {
  readonly moduleName = 'UsersController';
  constructor (
    @inject(Modules.Logger) private readonly loggerService: Logger,
    @inject(Modules.UsersService) private readonly usersService: UsersService
  ) {
    super(loggerService);
  }

  register: ControllerHandler = async (req, res) => {
    this.loggerService.requestInfo(req, req.body, this.moduleName);
    const dto = req.body as RegisterUserDto;
    const registeredUser = await this.usersService.register(dto);
    const response = {
      id: registeredUser.id,
      email: registeredUser.email,
      name: registeredUser.name
    };
    res.status(201).json(response);
    this.loggerService.responseInfo(req, response, this.moduleName);
  };

  login: ControllerHandler = async (req, res) => {
    this.loggerService.requestInfo(req, req.body, this.moduleName);
    const dto = req.body as LoginUserDto;
    const response = await this.usersService.login(dto);

    if (!response) {
      res.status(404).json({ error: 'Такого пользователя не существует' });

      return;
    }

    res.status(200).json(response);
  };

  getRoutes (): Route[] {
    return [
      { method: 'post', path: RoutePath.REGISTER, cb: this.register, middleware: [new ValidateMiddleware(RegisterUserDto)] },
      { method: 'post', path: RoutePath.LOGIN, cb: this.login, middleware: [new ValidateMiddleware(LoginUserDto)] }
    ];
  }
}
