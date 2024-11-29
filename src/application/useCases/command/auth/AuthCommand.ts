import { createHash } from "crypto";
import { LoginDTO } from "../../../../infra/dtos/auth";

class AuthCommand {
    public static validateLoginDTO(dto: LoginDTO): boolean {
        return dto.email !== "" && dto.password !== "";
    }

    public static hashPassword = (password: string) => {
        const hash = createHash("sha256");
        hash.update(password);
        return hash.digest("hex");
    }
}

export default AuthCommand;