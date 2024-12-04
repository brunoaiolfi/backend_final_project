import express from 'express';
import cors from "cors";
import userRoutes from './infra/routes/user/UserRoutes';
import authRoutes from './infra/routes/auth/AuthRoutes';
import UserController from './infra/controllers/user/UserController';
import { VerifyTokenMiddleware } from './infra/middlewares/VerifyTokenMiddleware';
import contentRoutes from './infra/routes/content/ContentRoutes';

const app = express();
const port = 3000;
const verifyTokenMiddleware = new VerifyTokenMiddleware();

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use(verifyTokenMiddleware.verify);

app.use("/users", userRoutes);
app.use("/contents", contentRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});