import DataBaseImplementation from "../../infra/database/Implementation/DataBaseImplementation";
import UserEntity from "../../domain/entities/user/UserEntity";
import { PrismaClient } from "@prisma/client";

class AbstractRepository<T> extends DataBaseImplementation<T> {

    constructor(model: keyof PrismaClient) {
        super(model);
    }

    public async getAll(): Promise<T[]> {
        const res = await this.select();
        return res;
    }

    public async getBy(key: string, value: any): Promise<T> {
        const res = await this.selectBy(key, value);
        return res;
    }

    public async post(user: Omit<T, "id">): Promise<T> {
        const res = await this.insert(user);
        return res;
    }

    public async put(id: number, user: UserEntity): Promise<T> {
        const res = await this.update(id, user);
        return res;
    }

    public async delete(id: number): Promise<void> {
        await this.remove(id);
    }
}

export default AbstractRepository;