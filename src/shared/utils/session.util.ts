import { InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Request } from 'express'

import type { User } from '@/prisma/generated'

export const saveSession = (req: Request, user: User) =>
	new Promise((resolve, reject) => {
		req.session.createdAt = new Date()
		req.session.userId = user.id
		req.session.telegramId = user.telegramId

		req.session.save(err => {
			if (err) {
				reject(
					new InternalServerErrorException('Couldn`t save session')
				)
				return
			}

			resolve({ user })
		})
	})

export const destroySession = (req: Request, configService: ConfigService) =>
	new Promise((resolve, reject) => {
		req.session.destroy(err => {
			if (err) {
				reject(
					new InternalServerErrorException('Couldn`t close session')
				)
				return
			}

			req.res?.clearCookie(
				configService.getOrThrow<string>('SESSION_NAME')
			)

			resolve(true)
		})
	})
