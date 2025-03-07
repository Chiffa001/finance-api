import {
	type CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly prismaService: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()

		const { userId } = request
		if (!userId) {
			throw new UnauthorizedException('User is not authorized')
		}

		const user = await this.prismaService.user.findUnique({
			where: { id: userId }
		})
		if (!user) {
			throw new NotFoundException('Couldn`t find such user')
		}

		request.user = user

		return true
	}
}
