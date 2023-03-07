import mongoose from "mongoose";
import { logger } from "../middlewares/index.middleware";
const connectionUrl = process.env.DATABASE_URL;

if (!connectionUrl) {
  throw new Error("Invalid connection url");
}

export default () => {
  mongoose.set("strictQuery", false),
    mongoose
      .connect(connectionUrl)
      .then(() => {
        logger.info("Connected to database successfully");
      })
      .catch((err) => {
        logger.error("Failed to connect to database", err);
      });
};
