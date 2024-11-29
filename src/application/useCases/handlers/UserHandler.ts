import UserModel from "../../models/UserModel";
import UserRepository from "../../repositories/UserRepository";

class UserHandler {
    private repository = new UserRepository();

    public async getAll(): Promise<UserModel[]> {
        return await this.repository.getAll();
    }

    public async create(user: Omit<UserModel, "id">): Promise<UserModel> {
        return await this.repository.post(user);
    }
}

export default UserHandler;