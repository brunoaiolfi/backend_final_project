import { sign } from "jsonwebtoken";
import UserEntity from "../../../domain/entities/user/UserEntity";

export class AuthImplementation {
    public generateToken(user: UserEntity) {
        return sign(user, "apresentacaoFinalDeBackEnd", { expiresIn: "12h"});;
    }
}