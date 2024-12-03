import { NextFunction, Request, Response } from "express";
import { AuthImplementation } from "../Implementations/auth/AuthImplementation";

export class VerifyTokenMiddleware extends AuthImplementation {
    public verify = async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.headers.authorization;

        if (!authorization) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const token = authorization.replace("Bearer ", "");

        try {
            const data = this.verifyToken(token);

            if (!data.email) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }
            
            next();
        } catch (error) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
    }
}