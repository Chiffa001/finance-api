import { UserModel } from '@prisma/client';

import { RegisterUserDto } from '~/users/dto/register-user.dto';

export interface User {
  register: (user: RegisterUserDto) => Promise<UserModel>
}
