import { Module } from '@nestjs/common'

import { HealthMonitorController } from './health-monitor.controller'

@Module({
	controllers: [HealthMonitorController]
})
export class HealthMonitorModule {}
