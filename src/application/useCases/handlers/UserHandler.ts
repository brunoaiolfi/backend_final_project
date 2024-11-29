import UserModel from "../../models/UserModel";
import UserRepository from "../../repositories/UserRepository";

class UserHandler {
    private repository = new UserRepository();

    public async getAll(): Promise<UserModel[]> {
        return await this.repository.getAll();
    }
}

export default UserHandler;