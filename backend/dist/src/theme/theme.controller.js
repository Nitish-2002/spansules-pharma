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
exports.ThemeController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ThemeController = class ThemeController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getThemes() {
        return this.prisma.theme.findMany();
    }
    async getActiveTheme() {
        const active = await this.prisma.theme.findFirst({
            where: { isActive: true },
        });
        if (!active) {
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
    async createTheme(data) {
        return this.prisma.theme.create({ data });
    }
    async activateTheme(id) {
        await this.prisma.theme.updateMany({
            data: { isActive: false },
        });
        return this.prisma.theme.update({
            where: { id },
            data: { isActive: true },
        });
    }
};
exports.ThemeController = ThemeController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "getThemes", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "getActiveTheme", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "createTheme", null);
__decorate([
    (0, common_1.Put)(':id/activate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "activateTheme", null);
exports.ThemeController = ThemeController = __decorate([
    (0, common_1.Controller)('theme'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ThemeController);
//# sourceMappingURL=theme.controller.js.map