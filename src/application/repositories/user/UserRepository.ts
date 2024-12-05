import UserModel from "../../models/UserModel";
import AbstractRepository from "../AbstractRepository";

class UserRepository extends AbstractRepository<UserModel>{
    constructor() {
        super("user");
    }
}

export default UserRepository;