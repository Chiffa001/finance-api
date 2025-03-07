import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req
} from '@nestjs/common'
import type { Request } from 'express'

import { Authorization } from '@/src/shared/decorators/authorization.decorator'

import { LoginDto } from './dto/login.dto'
import { SessionService } from './session.service'

@Controller('session')
export class SessionController {
	constructor(private readonly sessionService: SessionService) {}

	@Authorization()
	@Get('byUser')
	async findByUser(@Req() request: Request) {
		return this.sessionService.findByUser(request)
	}

	@Authorization()
	@Get('current')
	async findCurrent(@Req() request: Request) {
		return this.sessionService.findCurrent(request)
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Req() request: Request, @Body() dto: LoginDto) {
		return this.sessionService.login(request, dto)
	}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Post('logout')
	async logout(@Req() request: Request) {
		return this.sessionService.logout(request)
	}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Post('clear')
	async clearSession(@Req() request: Request) {
		return this.sessionService.clearSession(request)
	}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Post('remove')
	async remove(@Req() request: Request, @Body() sessionId: string) {
		return this.sessionService.remove(request, sessionId)
	}
}
