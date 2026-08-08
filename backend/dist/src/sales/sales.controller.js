"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let SalesController = class SalesController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCustomers() {
        return this.prisma.customer.findMany();
    }
    async createCustomer(data) {
        return this.prisma.customer.create({ data });
    }
    async getOrders() {
        return this.prisma.sale.findMany({
            include: {
                customer: true,
                items: true,
            },
        });
    }
    async createOrder(data) {
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
            await tx.accountReceivable.create({
                data: {
                    saleId: sale.id,
                    amount: totalAmount,
                    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                    status: 'UNPAID',
                },
            });
            return sale;
        });
    }
    async getAnalytics() {
        const sales = await this.prisma.sale.findMany({
            select: {
                saleDate: true,
                totalAmount: true,
            },
            orderBy: {
                saleDate: 'asc',
            },
        });
        const grouped = sales.reduce((acc, sale) => {
            const dateStr = sale.saleDate.toISOString().split('T')[0];
            if (!acc[dateStr]) {
                acc[dateStr] = 0;
            }
            acc[dateStr] += sale.totalAmount;
            return acc;
        }, {});
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
};
exports.SalesController = SalesController;
__decorate([
    (0, common_1.Get)('customers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "getCustomers", null);
__decorate([
    (0, common_1.Post)('customers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)('orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Post)('orders'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('analytics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "getAnalytics", null);
exports.SalesController = SalesController = __decorate([
    (0, common_1.Controller)('sales'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalesController);
//# sourceMappingURL=sales.controller.js.map