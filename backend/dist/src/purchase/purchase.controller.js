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
exports.PurchaseController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PurchaseController = class PurchaseController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getVendors() {
        return this.prisma.vendor.findMany();
    }
    async createVendor(data) {
        return this.prisma.vendor.create({ data });
    }
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
    async createOrder(data) {
        const totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
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
            await tx.accountPayable.create({
                data: {
                    purchaseId: purchase.id,
                    amount: totalAmount,
                    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    status: 'UNPAID',
                },
            });
            return purchase;
        });
    }
};
exports.PurchaseController = PurchaseController;
__decorate([
    (0, common_1.Get)('vendors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "getVendors", null);
__decorate([
    (0, common_1.Post)('vendors'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "createVendor", null);
__decorate([
    (0, common_1.Get)('orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Post)('orders'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "createOrder", null);
exports.PurchaseController = PurchaseController = __decorate([
    (0, common_1.Controller)('purchase'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PurchaseController);
//# sourceMappingURL=purchase.controller.js.map