import express, { Application } from "express";
import pino from "pino";
import db from "../db/mongoose.db";

export const logger = pino({
    level: 'info',
  });

db();

export default (app: Application) => {
    app.use(express.json());
};