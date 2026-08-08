import { Controller, Get, Post, Body, Query, Put, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ItemType } from '@prisma/client';

@Controller('store')
export class StoreController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getMedicines(@Query('type') type?: ItemType) {
    if (type) {
      return this.prisma.medicine.findMany({
        where: { type },
      });
    }
    return this.prisma.medicine.findMany();
  }

  @Post()
  async createMedicine(@Body() data: { name: string; code: string; type: ItemType; unit: string; quantity: number; minStock: number; description?: string }) {
    return this.prisma.medicine.create({
      data: {
        name: data.name,
        code: data.code,
        type: data.type,
        unit: data.unit,
        quantity: data.quantity || 0,
        minStock: data.minStock || 10,
        description: data.description,
      },
    });
  }

  @Put(':id/stock')
  async updateStock(@Param('id') id: string, @Body() data: { quantity: number }) {
    return this.prisma.medicine.update({
      where: { id },
      data: { quantity: data.quantity },
    });
  }
}
