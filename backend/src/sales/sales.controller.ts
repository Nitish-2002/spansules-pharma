import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('sales')
export class SalesController {
  constructor(private prisma: PrismaService) {}

  // Customer endpoints
  @Get('customers')
  async getCustomers() {
    return this.prisma.customer.findMany();
  }

  @Post('customers')
  async createCustomer(@Body() data: any) {
    return this.prisma.customer.create({ data });
  }

  // Sales Order endpoints
  @Get('orders')
  async getOrders() {
    return this.prisma.sale.findMany({
      include: {
        customer: true,
        items: true,
      },
    });
  }

  @Post('orders')
  async createOrder(@Body() data: { customerId: string; invoiceNumber: string; items: Array<{ name: string; quantity: number; price: number }> }) {
    const totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    return this.prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          invoiceNumber: data.invoiceNumber,
          customerId: data.customerId,
          totalAmount,
          status: 'UNPAID',
          items: {
            create: data.items.map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              total: item.quantity * item.price,
            })),
          },
        },
      });

      // Automatically create Account Receivable
      await tx.accountReceivable.create({
        data: {
          saleId: sale.id,
          amount: totalAmount,
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Due in 15 days
          status: 'UNPAID',
        },
      });

      return sale;
    });
  }

  // Dashboard analytics endpoint
  @Get('analytics')
  async getAnalytics() {
    // Get sales grouped by date for charts
    const sales = await this.prisma.sale.findMany({
      select: {
        saleDate: true,
        totalAmount: true,
      },
      orderBy: {
        saleDate: 'asc',
      },
    });

    // Grouping helper
    const grouped = sales.reduce((acc, sale) => {
      const dateStr = sale.saleDate.toISOString().split('T')[0];
      if (!acc[dateStr]) {
        acc[dateStr] = 0;
      }
      acc[dateStr] += sale.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(grouped).map(([date, total]) => ({
      date,
      revenue: total,
    }));

    return {
      chartData,
      totalSales: sales.reduce((sum, s) => sum + s.totalAmount, 0),
      count: sales.length,
    };
  }
}
