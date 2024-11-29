class UserCommand {
    public static validatePassword(password: string): boolean {
        return password.length >= 8;
    }
}

export default UserCommand;