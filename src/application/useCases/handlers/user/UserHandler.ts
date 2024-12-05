import UserEntity from "../../../../domain/entities/user/UserEntity";
import UserModel from "../../../models/UserModel";
import UserRepository from "../../../repositories/user/UserRepository";
import AbstractHandler from "../AbstractHandler";

class UserHandler extends AbstractHandler<UserModel, UserEntity> {
    constructor() {
        super(UserRepository);
    }
}

export default UserHandler;