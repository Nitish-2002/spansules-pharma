import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('purchase')
export class PurchaseController {
  constructor(private prisma: PrismaService) {}

  // Vendor endpoints
  @Get('vendors')
  async getVendors() {
    return this.prisma.vendor.findMany();
  }

  @Post('vendors')
  async createVendor(@Body() data: any) {
    return this.prisma.vendor.create({ data });
  }

  // Purchase Order endpoints
  @Get('orders')
  async getOrders() {
    return this.prisma.purchase.findMany({
      include: {
        vendor: true,
        items: {
          include: { medicine: true },
        },
      },
    });
  }

  @Post('orders')
  async createOrder(@Body() data: { vendorId: string; poNumber: string; orderDate: string; items: Array<{ medicineId: string; quantity: number; price: number }> }) {
    const totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    // Create the purchase order and its items in a transaction
    return this.prisma.$transaction(async (tx) => {
      const purchase = await tx.purchase.create({
        data: {
          poNumber: data.poNumber,
          vendorId: data.vendorId,
          orderDate: new Date(data.orderDate),
          totalAmount,
          status: 'PENDING',
          items: {
            create: data.items.map(item => ({
              medicineId: item.medicineId,
              quantity: item.quantity,
              price: item.price,
              total: item.quantity * item.price,
            })),
          },
        },
      });

      // Automatically create Account Payable entry
      await tx.accountPayable.create({
        data: {
          purchaseId: purchase.id,
          amount: totalAmount,
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Due in 30 days
          status: 'UNPAID',
        },
      });

      return purchase;
    });
  }
}
