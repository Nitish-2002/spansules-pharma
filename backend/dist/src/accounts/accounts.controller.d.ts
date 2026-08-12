import { PrismaService } from '../prisma.service';
export declare class AccountsController {
    private prisma;
    constructor(prisma: PrismaService);
    getPayables(): Promise<({
        purchase: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        dueDate: Date;
        amount: number;
        paidAmount: number;
        purchaseId: string;
    })[]>;
    getReceivables(): Promise<({
        sale: {
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
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            totalAmount: number;
            invoiceNumber: string;
            customerId: string;
            saleDate: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        dueDate: Date;
        amount: number;
        paidAmount: number;
        saleId: string;
    })[]>;
    payBill(id: string, data: {
        amount: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        dueDate: Date;
        amount: number;
        paidAmount: number;
        purchaseId: string;
    }>;
    receivePayment(id: string, data: {
        amount: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        dueDate: Date;
        amount: number;
        paidAmount: number;
        saleId: string;
    }>;
    getSummary(): Promise<{
        payable: {
            total: number;
            paid: number;
            outstanding: number;
        };
        receivable: {
            total: number;
            paid: number;
            outstanding: number;
        };
        cashFlow: number;
    }>;
}
