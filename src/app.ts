import express from "express";
import  "express-async-errors";

import indexMiddleware from "./middlewares/index.middleware";

const app = express();

indexMiddleware(app)

export default app;

