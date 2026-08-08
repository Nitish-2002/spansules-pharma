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
exports.ProductionController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductionController = class ProductionController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBatches() {
        return this.prisma.batch.findMany({
            include: {
                medicine: true,
                inProcessSteps: true,
            },
        });
    }
    async createBatch(data) {
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
    async updateStep(id, data) {
        return this.prisma.inProcessStep.update({
            where: { id },
            data: {
                status: data.status,
                notes: data.notes,
            },
        });
    }
    async updateBatchStatus(id, data) {
        const dataUpdate = { status: data.status };
        if (data.status === 'COMPLETED') {
            dataUpdate.endDate = new Date();
        }
        return this.prisma.$transaction(async (tx) => {
            const batch = await tx.batch.update({
                where: { id },
                data: dataUpdate,
            });
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
};
exports.ProductionController = ProductionController;
__decorate([
    (0, common_1.Get)('batches'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductionController.prototype, "getBatches", null);
__decorate([
    (0, common_1.Post)('batches'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductionController.prototype, "createBatch", null);
__decorate([
    (0, common_1.Put)('steps/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductionController.prototype, "updateStep", null);
__decorate([
    (0, common_1.Put)('batches/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductionController.prototype, "updateBatchStatus", null);
exports.ProductionController = ProductionController = __decorate([
    (0, common_1.Controller)('production'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductionController);
//# sourceMappingURL=production.controller.js.map