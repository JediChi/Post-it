import userRouter from "./user.route";
import postRouter from "./post.route"
import commentRouter from "./comment.route";
import additionalRouter from "./additionalUserRoute.route";

const basePath = "/api/v1"

export default (app: { use: (arg0: string, arg1: any) => void; }) => {
    app.use(`${basePath}/users`, [userRouter, additionalRouter]);
    app.use(`${basePath}/posts`, [postRouter, commentRouter]);
    // app.use(`${basePath}/posts/:postid/comments`, commentRouter);
  };
