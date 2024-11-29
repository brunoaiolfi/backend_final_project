import express from 'express';
import cors from "cors";
import userRouter from './infra/routes/user';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});