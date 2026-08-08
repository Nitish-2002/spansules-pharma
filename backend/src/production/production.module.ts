import { Module } from '@nestjs/common';
import { ProductionController } from './production.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductionController],
})
export class ProductionModule {}
