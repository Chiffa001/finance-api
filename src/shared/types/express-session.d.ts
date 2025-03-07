import 'express-session'

declare module 'express-session' {
	interface SessionData {
		userId?: string
		telegramId?: string
		createdAt?: Date | string
	}
}
