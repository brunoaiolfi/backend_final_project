import UserHandler from "../../application/useCases/handlers/UserHandler";
import { Request, Response } from "express";
import { UserDTO } from "../dtos/user";
import UserCommand from "../../application/useCases/command/UserCommand";

class UserController {
    private userHandler = new UserHandler()

    public getAll = async (req: Request, res: Response) => {
        try {
            const users = await this.userHandler.getAll();

            if (!users) {
                res.status(404).send("No users found");
                return;
            }

            const response = users.map(u => {
                const user = new UserDTO(u.id, u.email);
                return user;
            });

            res.json(response);
        } catch (error: any) {
            res.send(error.message);
        }
    }

    public create = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send("Email and password are required");
            return;
        }

        if (!UserCommand.validatePassword(password)) {
            res.status(400).send("Password must have at least 8 characters");
            return;
        }

        try {
            const user = await this.userHandler.create({
                email,
                password
            });
            
            const response = new UserDTO(user.id, user.email);
            res.status(201).json(response);

        } catch (error: any) {
            res.send(error.message);
        }
    }
}

export default UserController;