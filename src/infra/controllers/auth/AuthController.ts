import { Request, Response } from "express";
import AuthHandler from "../../../application/useCases/handlers/auth/AuthHandler";
import { LoginDTO } from "../../dtos/auth";
import AuthCommand from "../../../application/useCases/command/auth/AuthCommand";

class AuthController {
    private authHandler = new AuthHandler()

    public login = async (req: Request, res: Response) => {
        const loginDTO = req.body as LoginDTO;

        if (!AuthCommand.validateLoginDTO(loginDTO)) {
            res.status(400).send("Please enter a valid login data.");
            return;
        }

        try {
            const result = await this.authHandler.authenticate(loginDTO);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default AuthController;