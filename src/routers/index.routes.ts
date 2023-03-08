import userRouter from "./user.route";

const basePath = "/api/v1"

export default (app: { use: (arg0: string, arg1: any) => void; }) => {
    app.use(`${basePath}/users`, userRouter);
  };