import {
	ConflictException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Request } from 'express'
import { SessionData } from 'express-session'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import { RedisService } from '@/src/core/redis/redis.service'
import { destroySession, saveSession } from '@/src/shared/utils/session.util'

import { LoginDto } from './dto/login.dto'

const SESSION_FOLDER_KEY = 'SESSION_FOLDER'

@Injectable()
export class SessionService {
	constructor(
		private readonly configService: ConfigService,
		private readonly prismaService: PrismaService,
		private readonly redisService: RedisService
	) {}

	async findByUser(request: Request) {
		const { userId, id } = request.session

		const keys = await this.redisService.keys('*')

		const userSessions: (Required<SessionData> & { id: string })[] = []

		for (const key of keys) {
			const sessionData = await this.redisService.get(key)

			if (sessionData) {
				const session: Required<SessionData> = JSON.parse(sessionData)

				if (session.userId === userId) {
					userSessions.push({ ...session, id: key.split(':')[1] })
				}
			}
		}

		userSessions.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))

		return userSessions.filter(session => session.id !== id)
	}

	async findCurrent(request: Request) {
		const { id: sessionId } = request.session

		const sessionData = await this.redisService.get(
			`${this.configService.getOrThrow<string>(SESSION_FOLDER_KEY)}${sessionId}`
		)

		const session = JSON.parse(sessionData as string)

		return {
			...session,
			id: sessionId
		}
	}

	async login(request: Request, { telegramId }: LoginDto) {
		const user = await this.prismaService.user.findUnique({
			where: { telegramId }
		})

		if (!user) {
			throw new UnauthorizedException("Couldn't find user with such tgID")
		}

		return saveSession(request, user)
	}

	async logout(request: Request) {
		return destroySession(request, this.configService)
	}

	async clearSession(request: Request) {
		request.res?.clearCookie(
			this.configService.getOrThrow<string>('SESSION_NAME')
		)

		return true
	}

	async remove(request: Request, id: string) {
		if (request.session.id === id) {
			throw new ConflictException('Текущую сессию удалить нельзя')
		}

		await this.redisService.del(
			`${this.configService.getOrThrow<string>(SESSION_FOLDER_KEY)}${id}`
		)

		return true
	}
}
