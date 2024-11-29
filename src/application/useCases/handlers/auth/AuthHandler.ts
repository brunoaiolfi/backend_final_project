import { LoginDTO } from "../../../../infra/dtos/auth";
import AuthRepository from "../../../repositories/auth/AuthRepository";
import AuthCommand from "../../command/auth/AuthCommand";

class AuthHandler {
    private repository = new AuthRepository();

    public authenticate = async (dto: LoginDTO) => {
        const hashedPassword = AuthCommand.hashPassword(dto.password);
        const user = await this.repository.login({...dto, password: hashedPassword});

        if (!user) {
            throw new Error("Invalid credentials.");
        }
    }
}

export default AuthHandler;