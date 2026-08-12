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
        email: string;
        contact: string;
        phone: string;
        address: string;
    }[]>;
    createVendor(data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        email: string;
        contact: string;
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
            email: string;
            contact: string;
            phone: string;
            address: string;
        };
        items: ({
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
        } & {
            id: string;
            quantity: number;
            medicineId: string;
            price: number;
            total: number;
            purchaseId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        poNumber: string;
        vendorId: string;
        orderDate: Date;
        deliveryDate: Date | null;
        totalAmount: number;
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
        status: string;
        poNumber: string;
        vendorId: string;
        orderDate: Date;
        deliveryDate: Date | null;
        totalAmount: number;
    }>;
}
