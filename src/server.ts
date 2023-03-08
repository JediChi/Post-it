import  "express-async-errors";

import { logger } from "./middlewares/index.middleware";

import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});