import DataBaseImplementation from "../../../infra/Implementations/database/DataBaseImplementation";
import { LoginDTO } from "../../../infra/dtos/auth";
import UserModel from "../../models/UserModel";

class AuthRepository extends DataBaseImplementation<UserModel> {
    constructor() {
        super("user");
    }

    public async findByPasswordAndEmail(dto: LoginDTO) {
        const response = await this.prisma.user.findUnique({
            where: {
                ...dto
            }
        });
        
        return response;
    }

}

export default AuthRepository;