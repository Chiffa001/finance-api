import { IsOptional, IsString } from 'class-validator'

import { type User } from '@/prisma/generated'

export class FindProfileDto
	implements Partial<Pick<User, 'id' | 'telegramId'>>
{
	@IsString()
	@IsOptional()
	id?: string

	@IsString()
	@IsOptional()
	telegramId?: string
}
