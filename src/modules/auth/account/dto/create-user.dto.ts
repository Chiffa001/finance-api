import { IsNotEmpty, IsString } from 'class-validator'

import { User } from '@/prisma/generated'

export class CreateUserDto implements Pick<User, 'telegramId'> {
	@IsString()
	@IsNotEmpty()
	telegramId: string
}
