import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SalesController],
})
export class SalesModule {}
