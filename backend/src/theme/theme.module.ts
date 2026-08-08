import { Module } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ThemeController],
})
export class ThemeModule {}
