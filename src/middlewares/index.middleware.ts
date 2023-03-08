import express, { Application } from "express";
import pino from "pino";
import cors from "cors";
import morgan from "morgan";
import asyncError from "./errors.middleware";
import indexRoutes from "../routers/index.routes";
import db from "../db/mongoose.db";

export const logger = pino({
    level: 'info',
  });

db();

export default (app: Application) => {
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());

  indexRoutes(app);

  app.use(asyncError);
};