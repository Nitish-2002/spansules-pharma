import { PrismaService } from '../prisma.service';
export declare class ProductionController {
    private prisma;
    constructor(prisma: PrismaService);
    getBatches(): Promise<({
        medicine: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            description: string | null;
            type: import("@prisma/client").$Enums.ItemType;
            unit: string;
            quantity: number;
            minStock: number;
        };
        inProcessSteps: {
            id: string;
            updatedAt: Date;
            status: string;
            stepName: string;
            operator: string;
            notes: string | null;
            batchId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        batchNumber: string;
        medicineId: string;
        status: string;
        startDate: Date;
        endDate: Date | null;
    })[]>;
    createBatch(data: {
        batchNumber: string;
        medicineId: string;
        quantity: number;
    }): Promise<{
        medicine: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            description: string | null;
            type: import("@prisma/client").$Enums.ItemType;
            unit: string;
            quantity: number;
            minStock: number;
        };
        inProcessSteps: {
            id: string;
            updatedAt: Date;
            status: string;
            stepName: string;
            operator: string;
            notes: string | null;
            batchId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        batchNumber: string;
        medicineId: string;
        status: string;
        startDate: Date;
        endDate: Date | null;
    }>;
    updateStep(id: string, data: {
        status: string;
        notes?: string;
    }): Promise<{
        id: string;
        updatedAt: Date;
        status: string;
        stepName: string;
        operator: string;
        notes: string | null;
        batchId: string;
    }>;
    updateBatchStatus(id: string, data: {
        status: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        batchNumber: string;
        medicineId: string;
        status: string;
        startDate: Date;
        endDate: Date | null;
    }>;
}
