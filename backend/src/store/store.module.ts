import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StoreController],
})
export class StoreModule {}
