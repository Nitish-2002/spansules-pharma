import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('theme')
export class ThemeController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getThemes() {
    return this.prisma.theme.findMany();
  }

  @Get('active')
  async getActiveTheme() {
    const active = await this.prisma.theme.findFirst({
      where: { isActive: true },
    });
    if (!active) {
      // Return default Admin green colors
      return {
        name: 'default-green',
        primaryColor: '#0f5132',
        secondaryColor: '#d1e7dd',
        backgroundColor: '#ffffff',
        fontFamily: 'Inter',
        isActive: true,
      };
    }
    return active;
  }

  @Post()
  async createTheme(@Body() data: any) {
    return this.prisma.theme.create({ data });
  }

  @Put(':id/activate')
  async activateTheme(@Param('id') id: string) {
    await this.prisma.theme.updateMany({
      data: { isActive: false },
    });
    return this.prisma.theme.update({
      where: { id },
      data: { isActive: true },
    });
  }
}
