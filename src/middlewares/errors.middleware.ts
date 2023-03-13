import {Request, Response, NextFunction } from "express";


import  {logger } from "./index.middleware";

export default  (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(error);
  
  return res.status(res.statusCode || 500).send({
    success: false,
    message: error.message
  });

  
};