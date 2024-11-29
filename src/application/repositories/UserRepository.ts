import UserModel from "../models/UserModel";
import DataBaseImplementation from "../../infra/database/Implementation/DataBaseImplementation";
import UserEntity from "../../domain/entities/UserEntity";

class UserRepository extends DataBaseImplementation<UserModel>{

    constructor() {
        super("user");
    }

    public async getAll(): Promise<UserModel[]> {
        const users = await this.select();
        return users;
    }

    public async getBy(key: string, value: any): Promise<UserModel> {
        const user = await this.selectBy(key, value);
        return user;
    }
    
    public async post(user: Omit<UserModel, "id">): Promise<UserModel> {
        const newUser = await this.insert(user);
        return newUser;
    }

    public async put(id: number, user: UserEntity): Promise<UserModel> {
        const updatedUser = await this.update(id, user);
        return updatedUser;
    }

    public async delete(id: number): Promise<void> {
        await this.remove(id);
    }
}

export default UserRepository;