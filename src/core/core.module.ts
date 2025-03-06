import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HealthMonitorModule } from 'src/modules/health-monitor/health-monitor.module'
import { IS_DEV_ENV } from 'src/shared/is-dev.util'

import { PrismaModule } from './prisma/prisma.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: !IS_DEV_ENV }),
		HealthMonitorModule,
		PrismaModule
	]
})
export class CoreModule {}
