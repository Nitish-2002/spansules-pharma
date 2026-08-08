import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
