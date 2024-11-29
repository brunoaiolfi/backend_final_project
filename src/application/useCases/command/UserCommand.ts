import UserEntity from "../../../domain/entities/UserEntity";
import UserRepository from "../../repositories/UserRepository";

class UserCommand {
    private static repository = new UserRepository();

    public static validatePassword(password: string): boolean {
        return password.length >= 8;
    }

    public static validateEmail(email: string): boolean {
        return /\S+@\S+\.\S+/.test(email);
    }

    public static validateUserDTO(user: UserEntity): boolean {
        return this.validateEmail(user.email) && this.validatePassword(user.password);
    }

    public static isEmailAvailable = async (email: string, id?: number): Promise<boolean> => {
        const user = await this.repository.getBy("email", email);
        
        if (!user) return true;
        if (!id && user.id) return false;

        return user.id === id;
    }
}
export default UserCommand;