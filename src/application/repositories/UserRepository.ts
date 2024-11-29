import UserModel from "../models/UserModel";
import DataBaseImplementation from "../../infra/database/Implementation/DataBaseImplementation";

class UserRepository extends DataBaseImplementation<UserModel>{

    constructor() {
        super("user");
    }

    public async getAll(): Promise<UserModel[]> {
        const users = await this.select();
        return users;
    }

    public async post(user: Omit<UserModel, "id">): Promise<UserModel> {
        const newUser = await this.insert(user);
        return newUser;
    }
}

export default UserRepository;