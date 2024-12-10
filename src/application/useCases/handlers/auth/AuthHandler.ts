import { LoginDTO } from "../../../../infra/dtos/auth";
import AuthRepository from "../../../repositories/auth/AuthRepository";
import AuthCommand from "../../command/auth/AuthCommand";
import { AuthImplementation } from "../../../../infra/Implementations/auth/AuthImplementation";
import UserModel from "../../../models/UserModel";

interface IAuthenticate {
    isAuthenticated: boolean;
    user: UserModel | null;
    token: string;
}

class AuthHandler extends AuthImplementation {
    private repository = new AuthRepository();

    public authenticate = async (dto: LoginDTO): Promise<IAuthenticate> => {
        const hashedPassword = AuthCommand.hashPassword(dto.password);
        const user = await this.repository.findByPasswordAndEmail({ ...dto, password: hashedPassword });
        const token = user?.id ? this.generateToken(user) : '';
        
        return {
            isAuthenticated: !!user?.id,
            user,
            token
        }
    }
}

export default AuthHandler;