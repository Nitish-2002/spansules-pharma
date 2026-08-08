import { PrismaService } from '../prisma.service';
import { ItemType } from '@prisma/client';
export declare class StoreController {
    private prisma;
    constructor(prisma: PrismaService);
    getMedicines(type?: ItemType): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.ItemType;
        code: string;
        description: string | null;
        unit: string;
        quantity: number;
        minStock: number;
    }[]>;
    createMedicine(data: {
        name: string;
        code: string;
        type: ItemType;
        unit: string;
        quantity: number;
        minStock: number;
        description?: string;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.ItemType;
        code: string;
        description: string | null;
        unit: string;
        quantity: number;
        minStock: number;
    }>;
    updateStock(id: string, data: {
        quantity: number;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.ItemType;
        code: string;
        description: string | null;
        unit: string;
        quantity: number;
        minStock: number;
    }>;
}
