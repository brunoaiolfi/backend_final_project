import UserEntity from "../../../domain/entities/UserEntity";
import UserModel from "../../models/UserModel";
import UserRepository from "../../repositories/UserRepository";

class UserHandler {
    private repository = new UserRepository();

    public async getAll(): Promise<UserModel[]> {
        return await this.repository.getAll();
    }

    public async create(user: UserEntity): Promise<UserModel> {
        return await this.repository.post(user);
    }

    public async update(id: number, user: UserEntity): Promise<UserModel> {
        return await this.repository.put(id, user);
    }
}

export default UserHandler;