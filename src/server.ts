import express from 'express';
import cors from "cors";
import userRoutes from './infra/routes/user/UserRoutes';
import authRoutes from './infra/routes/auth/AuthRoutes';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes); // public
app.use("/users", userRoutes); // private

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});