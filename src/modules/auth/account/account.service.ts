import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'

import { CreateUserDto } from './dto/create-user.dto'
import { FindProfileDto } from './dto/find-profile.dto'

@Injectable()
export class AccountService {
	constructor(private readonly prismaService: PrismaService) {}

	async findProfile({ id, telegramId }: FindProfileDto) {
		if (!id && !telegramId) {
			throw new BadRequestException('Wrong searching params')
		}

		const user = await this.prismaService.user.findFirst({
			where: {
				id,
				telegramId
			}
		})

		if (!user) {
			throw new NotFoundException('Couldn`t find such user')
		}

		return user
	}

	async create({ telegramId }: CreateUserDto) {
		const isUserAlreadyExists = await this.prismaService.user.findUnique({
			where: { telegramId }
		})

		if (isUserAlreadyExists) {
			throw new ConflictException('Such user already exists')
		}

		await this.prismaService.user.create({ data: { telegramId } })

		return true
	}
}
