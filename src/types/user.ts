import { UserModel } from '@prisma/client';

import { LoginUserDto } from '~/users/dto/login-user.dto';
import { RegisterUserDto } from '~/users/dto/register-user.dto';

export interface User {
  register: (user: RegisterUserDto) => Promise<UserModel>
  login: (user: LoginUserDto) => Promise<{ token: string } | null>
}
