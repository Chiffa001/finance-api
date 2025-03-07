import { Controller, Get } from '@nestjs/common'

@Controller('health')
export class HealthMonitorController {
	@Get()
	healthCheck() {
		return { message: 'I`m healthy!' }
	}
}
