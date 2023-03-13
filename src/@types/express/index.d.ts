declare namespace Express {
    export interface Request {
        user?: any,
        post?: any,
        token?: string,
    }
  }