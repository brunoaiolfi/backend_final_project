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

    public async insert(data: any): Promise<T> {
        const response = await (this.prisma[this.model] as any).create({
            data
        });
        return response;
    }
}

export default DataBaseImplementation;