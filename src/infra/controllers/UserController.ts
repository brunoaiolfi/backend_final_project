import UserHandler from "../../application/useCases/handlers/UserHandler";
import { Request, Response } from "express";
import { UserDTO, UserInsertDTO } from "../dtos/user";
import UserCommand from "../../application/useCases/command/UserCommand";
import UserEntity from "../../domain/entities/UserEntity";

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
        const userDTO = req.body as UserInsertDTO;

        if (!UserCommand.validateUserDTO(userDTO)) {
            res.status(400).send("Email or Password invalid. Password must have at least 8 characters");
            return;
        }

        try {
            const user = await this.userHandler.create(userDTO);
            
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

        if (!await UserCommand.isEmailAvailable(userId, userDTO.email)) {
            res.status(400).send("Email already in use");
            return;
        }
        
        try {
            const user = await this.userHandler.update(userId, userDTO);
            
            const response = new UserDTO(user.id, user.email);
            res.json(response);
            
        } catch (error: any) {
            res.send(error.message);
        }
    }
}

export default UserController;