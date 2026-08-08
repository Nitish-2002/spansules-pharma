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
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let AccountsController = class AccountsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPayables() {
        return this.prisma.accountPayable.findMany({
            include: {
                purchase: {
                    include: { vendor: true },
                },
            },
        });
    }
    async getReceivables() {
        return this.prisma.accountReceivable.findMany({
            include: {
                sale: {
                    include: { customer: true },
                },
            },
        });
    }
    async payBill(id, data) {
        const ap = await this.prisma.accountPayable.findUnique({ where: { id } });
        if (!ap)
            throw new Error('Account Payable entry not found');
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
    async receivePayment(id, data) {
        const ar = await this.prisma.accountReceivable.findUnique({ where: { id } });
        if (!ar)
            throw new Error('Account Receivable entry not found');
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
            cashFlow: paidReceivable - paidPayable,
        };
    }
};
exports.AccountsController = AccountsController;
__decorate([
    (0, common_1.Get)('payable'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "getPayables", null);
__decorate([
    (0, common_1.Get)('receivable'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "getReceivables", null);
__decorate([
    (0, common_1.Put)('payable/:id/pay'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "payBill", null);
__decorate([
    (0, common_1.Put)('receivable/:id/receive'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "receivePayment", null);
__decorate([
    (0, common_1.Get)('summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "getSummary", null);
exports.AccountsController = AccountsController = __decorate([
    (0, common_1.Controller)('accounts'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountsController);
//# sourceMappingURL=accounts.controller.js.map