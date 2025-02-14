import { Injectable, OnModuleInit, OnModuleDestroy, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown {
    
    async onModuleInit() {
        await this.$connect(); // ✅ Connect to the database
    }

    async onModuleDestroy() {
        await this.$disconnect(); // ✅ Disconnect when module is destroyed
    }

    async onApplicationShutdown() {
        await this.$disconnect(); // ✅ Ensure proper cleanup when the app shuts down
    }
}
