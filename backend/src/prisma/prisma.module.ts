import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Global() // 👈 Isko Global bana diya
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 Export karna zaroori hai taake doosre modules me use ho sake
})
export class PrismaModule {}
