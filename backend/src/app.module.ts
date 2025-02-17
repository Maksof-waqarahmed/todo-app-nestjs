import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TodoModule, PrismaModule, UsersModule],
})
export class AppModule {}
