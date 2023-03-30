import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import userRouter  from "./routes/auth";
import postRouter  from "./routes/post";

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

app.listen(5000, () => {
    console.log("Server started on port 5000!");
});