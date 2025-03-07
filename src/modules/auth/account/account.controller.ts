import { Body, Controller, Get, Post } from '@nestjs/common'

import { Authorization } from '@/src/shared/decorators/authorization.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { AccountService } from './account.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Authorization()
	@Get('me')
	async me(@Authorized('id') userId: string) {
		return this.accountService.findProfile({ id: userId })
	}

	@Post('create')
	async create(@Body() dto: CreateUserDto) {
		return this.accountService.create(dto)
	}
}
