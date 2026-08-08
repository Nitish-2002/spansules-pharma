import { PrismaService } from '../prisma.service';
export declare class PurchaseController {
    private prisma;
    constructor(prisma: PrismaService);
    getVendors(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        contact: string;
        email: string;
        phone: string;
        address: string;
    }[]>;
    createVendor(data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        contact: string;
        email: string;
        phone: string;
        address: string;
    }>;
    getOrders(): Promise<({
        vendor: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            contact: string;
            email: string;
            phone: string;
            address: string;
        };
        items: ({
            medicine: {
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
            };
        } & {
            id: string;
            quantity: number;
            price: number;
            total: number;
            medicineId: string;
            purchaseId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        poNumber: string;
        vendorId: string;
        orderDate: Date;
        deliveryDate: Date | null;
        totalAmount: number;
        status: string;
    })[]>;
    createOrder(data: {
        vendorId: string;
        poNumber: string;
        orderDate: string;
        items: Array<{
            medicineId: string;
            quantity: number;
            price: number;
        }>;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        poNumber: string;
        vendorId: string;
        orderDate: Date;
        deliveryDate: Date | null;
        totalAmount: number;
        status: string;
    }>;
}
