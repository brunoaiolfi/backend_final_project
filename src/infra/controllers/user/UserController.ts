import UserHandler from "../../../application/useCases/handlers/user/UserHandler";
import { Request, Response } from "express";
import { UserDTO, UserInsertDTO } from "../../dtos/user";
import UserCommand from "../../../application/useCases/command/user/UserCommand";
import AuthCommand from "../../../application/useCases/command/auth/AuthCommand";

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

    public getById = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id);
        try {
            const user = await this.userHandler.getBy("id", userId);
            const response = new UserDTO(user.id, user.email);

            res.json(response);

        } catch (error: any) {
            res.send(error.message);
        }
    }

    public create = async (req: Request, res: Response) => {
        const userDTO = req.body as UserInsertDTO;

        if (!UserCommand.validateUserDTO(userDTO)) {
            res.status(400).send("Email or Password invalid. Password must have at least 8 characters");
            return;
        }

        if (!await UserCommand.isEmailAvailable(userDTO.email)) {
            res.status(400).send("Email already in use");
            return;
        }

        const hashedPassword = AuthCommand.hashPassword(userDTO.password);

        try {
            const user = await this.userHandler.create({ ...userDTO, password: hashedPassword });

            const response = new UserDTO(user.id, user.email);
            res.status(201).json(response);

        } catch (error: any) {
            res.send(error.message);
        }
    }

    public update = async (req: Request, res: Response) => {
        const userDTO = req.body as UserInsertDTO;
        const userId = parseInt(req.params.id);

        if (!UserCommand.validateUserDTO(userDTO)) {
            res.status(400).send("Email or Password invalid. Password must have at least 8 characters");
            return;
        }

        if (!await UserCommand.isEmailAvailable(userDTO.email, userId)) {
            res.status(400).send("Email already in use");
            return;
        }

        if (!await UserCommand.userExists(userId)) {
            res.status(404).send("User not found");
            return;
        }

        const hashedPassword = AuthCommand.hashPassword(userDTO.password);

        try {
            const user = await this.userHandler.update(userId, { ...userDTO, password: hashedPassword });

            const response = new UserDTO(user.id, user.email);
            res.json(response);

        } catch (error: any) {
            res.send(error.message);
        }
    }

    public delete = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id);

        try {
            if (!await UserCommand.userExists(userId)) {
                res.status(404).send("User not found");
                return;
            }

            await this.userHandler.delete(userId);
            res.status(200).send("User deleted");

        } catch (error: any) {
            res.send(error.message);
        }
    }
}

export default UserController;