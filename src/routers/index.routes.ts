import userRouter from "./user.route";
import postRouter from "./post.route"
import commentRouter from "./comment.route";

const basePath = "/api/v1"

export default (app: { use: (arg0: string, arg1: any) => void; }) => {
    app.use(`${basePath}/users`, userRouter);
    app.use(`${basePath}/posts`, postRouter);
    app.use(`${basePath}/posts/:id/comments`, commentRouter);
  };