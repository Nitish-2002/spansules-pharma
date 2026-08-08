import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('accounts')
export class AccountsController {
  constructor(private prisma: PrismaService) {}

  @Get('payable')
  async getPayables() {
    return this.prisma.accountPayable.findMany({
      include: {
        purchase: {
          include: { vendor: true },
        },
      },
    });
  }

  @Get('receivable')
  async getReceivables() {
    return this.prisma.accountReceivable.findMany({
      include: {
        sale: {
          include: { customer: true },
        },
      },
    });
  }

  @Put('payable/:id/pay')
  async payBill(@Param('id') id: string, @Body() data: { amount: number }) {
    const ap = await this.prisma.accountPayable.findUnique({ where: { id } });
    if (!ap) throw new Error('Account Payable entry not found');

    const newPaidAmount = ap.paidAmount + data.amount;
    const status = newPaidAmount >= ap.amount ? 'PAID' : 'PARTIAL';

    return this.prisma.accountPayable.update({
      where: { id },
      data: {
        paidAmount: newPaidAmount,
        status,
      },
    });
  }

  @Put('receivable/:id/receive')
  async receivePayment(@Param('id') id: string, @Body() data: { amount: number }) {
    const ar = await this.prisma.accountReceivable.findUnique({ where: { id } });
    if (!ar) throw new Error('Account Receivable entry not found');

    const newPaidAmount = ar.paidAmount + data.amount;
    const status = newPaidAmount >= ar.amount ? 'PAID' : 'PARTIAL';

    return this.prisma.accountReceivable.update({
      where: { id },
      data: {
        paidAmount: newPaidAmount,
        status,
      },
    });
  }

  // General summary calculation for the dashboard
  @Get('summary')
  async getSummary() {
    const payables = await this.prisma.accountPayable.findMany();
    const receivables = await this.prisma.accountReceivable.findMany();

    const totalPayable = payables.reduce((sum, item) => sum + item.amount, 0);
    const paidPayable = payables.reduce((sum, item) => sum + item.paidAmount, 0);
    const outstandingPayable = totalPayable - paidPayable;

    const totalReceivable = receivables.reduce((sum, item) => sum + item.amount, 0);
    const paidReceivable = receivables.reduce((sum, item) => sum + item.paidAmount, 0);
    const outstandingReceivable = totalReceivable - paidReceivable;

    return {
      payable: {
        total: totalPayable,
        paid: paidPayable,
        outstanding: outstandingPayable,
      },
      receivable: {
        total: totalReceivable,
        paid: paidReceivable,
        outstanding: outstandingReceivable,
      },
      cashFlow: paidReceivable - paidPayable, // simple logic: money in - money out
    };
  }
}
