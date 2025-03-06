import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/generated'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	public onModuleInit() {
		this.$connect()
	}

	public onModuleDestroy() {
		void this.$disconnect()
	}
}
