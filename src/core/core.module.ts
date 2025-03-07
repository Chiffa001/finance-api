import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { IS_DEV_ENV } from '@/src/shared/utils/is-dev.util'

import { AccountModule } from '../modules/auth/account/account.module'
import { SessionModule } from '../modules/auth/session/session.module'
import { HealthMonitorModule } from '../modules/health-monitor/health-monitor.module'

import { PrismaModule } from './prisma/prisma.module'
import { RedisModule } from './redis/redis.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: !IS_DEV_ENV }),
		HealthMonitorModule,
		PrismaModule,
		AccountModule,
		SessionModule,
		RedisModule
	]
})
export class CoreModule {}
