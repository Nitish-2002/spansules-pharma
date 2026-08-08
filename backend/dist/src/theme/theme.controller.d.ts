import { PrismaService } from '../prisma.service';
export declare class ThemeController {
    private prisma;
    constructor(prisma: PrismaService);
    getThemes(): Promise<{
        id: string;
        name: string;
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
        fontFamily: string;
        logoUrl: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getActiveTheme(): Promise<{
        id: string;
        name: string;
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
        fontFamily: string;
        logoUrl: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | {
        name: string;
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
        fontFamily: string;
        isActive: boolean;
    }>;
    createTheme(data: any): Promise<{
        id: string;
        name: string;
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
        fontFamily: string;
        logoUrl: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    activateTheme(id: string): Promise<{
        id: string;
        name: string;
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
        fontFamily: string;
        logoUrl: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
