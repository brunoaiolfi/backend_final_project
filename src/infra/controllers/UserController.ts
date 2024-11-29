import UserHandler from "../../application/useCases/handlers/UserHandler";
import { Request, Response } from "express";
import { UserDTO } from "../dtos/user";

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
}

export default UserController;