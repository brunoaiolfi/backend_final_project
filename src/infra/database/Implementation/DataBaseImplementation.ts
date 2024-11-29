import { PrismaClient } from "@prisma/client";

class DataBaseImplementation<T> {
    private model: keyof PrismaClient;
    private prisma = new PrismaClient();

    constructor(model: keyof PrismaClient) {
        this.model = model;
    }

    public async select(): Promise<T[]> {
        const response = await (this.prisma[this.model] as any).findMany();
        return response;
    }

    public async selectBy(key: string, value: any): Promise<T> {
        const response = await (this.prisma[this.model] as any).findUnique({
            where: {
                [key]: value
            }
        });
        return response;
    }

    public async insert(data: any): Promise<T> {
        const response = await (this.prisma[this.model] as any).create({
            data
        });
        return response;
    }

    public async update(id: number, data: any): Promise<T> {
        const response = await (this.prisma[this.model] as any).update({
            where: {
                id
            },
            data
        });
        
        return response;
    }
}

export default DataBaseImplementation;