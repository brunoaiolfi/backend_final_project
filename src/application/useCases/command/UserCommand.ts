import UserEntity from "../../../domain/entities/UserEntity";

class UserCommand {
    public static validatePassword(password: string): boolean {
        return password.length >= 8;
    }

    public static validateEmail(email: string): boolean {
        return /\S+@\S+\.\S+/.test(email);
    }

    public static validateUser(user: UserEntity): boolean {
        return this.validateEmail(user.email) && this.validatePassword(user.password);
    }
}

export default UserCommand;