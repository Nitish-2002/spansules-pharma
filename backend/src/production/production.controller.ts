import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('production')
export class ProductionController {
  constructor(private prisma: PrismaService) {}

  @Get('batches')
  async getBatches() {
    return this.prisma.batch.findMany({
      include: {
        medicine: true,
        inProcessSteps: true,
      },
    });
  }

  @Post('batches')
  async createBatch(@Body() data: { batchNumber: string; medicineId: string; quantity: number }) {
    return this.prisma.batch.create({
      data: {
        batchNumber: data.batchNumber,
        medicineId: data.medicineId,
        quantity: data.quantity,
        status: 'IN_PROCESS',
        inProcessSteps: {
          create: [
            { stepName: 'Mixing', status: 'ACTIVE', operator: 'System Operator' },
            { stepName: 'Granulation', status: 'PENDING', operator: 'System Operator' },
            { stepName: 'Compression', status: 'PENDING', operator: 'System Operator' },
            { stepName: 'Coating', status: 'PENDING', operator: 'System Operator' },
            { stepName: 'Packaging', status: 'PENDING', operator: 'System Operator' },
          ],
        },
      },
      include: {
        medicine: true,
        inProcessSteps: true,
      },
    });
  }

  @Put('steps/:id')
  async updateStep(@Param('id') id: string, @Body() data: { status: string; notes?: string }) {
    return this.prisma.inProcessStep.update({
      where: { id },
      data: {
        status: data.status,
        notes: data.notes,
      },
    });
  }

  @Put('batches/:id/status')
  async updateBatchStatus(@Param('id') id: string, @Body() data: { status: string }) {
    const dataUpdate: any = { status: data.status };
    if (data.status === 'COMPLETED') {
      dataUpdate.endDate = new Date();
    }
    
    return this.prisma.$transaction(async (tx) => {
      const batch = await tx.batch.update({
        where: { id },
        data: dataUpdate,
      });

      // If production completed, add to finished goods medicine quantity automatically
      if (data.status === 'COMPLETED') {
        await tx.medicine.update({
          where: { id: batch.medicineId },
          data: {
            quantity: {
              increment: batch.quantity,
            },
          },
        });
      }

      return batch;
    });
  }
}
