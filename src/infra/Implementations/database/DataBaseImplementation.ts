import { PrismaClient } from "@prisma/client";

class DataBaseImplementation<T> {
    private model: keyof PrismaClient;
    protected prisma = new PrismaClient();

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

    public async remove(id: number): Promise<void> {
        await (this.prisma[this.model] as any).delete({
            where: {
                id
            }
        });
    }

    public async $queryRawUnsafe(query: string): Promise<any> {
        return await this.prisma.$queryRawUnsafe(query);
    }
}

export default DataBaseImplementation;