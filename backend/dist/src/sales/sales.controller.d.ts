import { PrismaService } from '../prisma.service';
export declare class SalesController {
    private prisma;
    constructor(prisma: PrismaService);
    getCustomers(): Promise<{
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
    createCustomer(data: any): Promise<{
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
        customer: {
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
        items: {
            id: string;
            name: string;
            quantity: number;
            price: number;
            total: number;
            saleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        totalAmount: number;
        invoiceNumber: string;
        customerId: string;
        saleDate: Date;
    })[]>;
    createOrder(data: {
        customerId: string;
        invoiceNumber: string;
        items: Array<{
            name: string;
            quantity: number;
            price: number;
        }>;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        totalAmount: number;
        invoiceNumber: string;
        customerId: string;
        saleDate: Date;
    }>;
    getAnalytics(): Promise<{
        chartData: {
            date: string;
            revenue: number;
        }[];
        totalSales: number;
        count: number;
    }>;
}
