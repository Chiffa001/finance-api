import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { type User } from '@/prisma/generated'

export const Authorized = createParamDecorator(
	(data: keyof User, context: ExecutionContext) => {
		const { user } = context.switchToHttp().getRequest()

		return data ? user[data] : user
	}
)
