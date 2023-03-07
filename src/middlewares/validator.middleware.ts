import { Request, Response, NextFunction } from "express";
import _ from "lodash";

const validator =
  (schema: { validateAsync: (arg0: any) => any; }, source = "body" || "query") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const _source = source === 'body' ? req.body : req.query
      let value = await schema.validateAsync(_source);
      if (source === "body") {
        // req._body = req?.body; // for debugging purposes
        req.body = value;
        // value = req.body // validated value
      }
      if (source === "query") {
        // req._query = req?.query; // for debugging purposes
        req.query = value; // validated value
      }

      return next();
    } catch (error: any) {
    //   const { type = "pattern_string", message = "error" } = { ...error.details[0] };

    //   const isPatternError =
    //     type === "string.pattern.base" || type.startsWith("string.pattern");

    //   if (isPatternError) {
    //     // const shownError = 'Custom message for pattern errors';
    //     // // This helps to the actual error message
    //     // logger.error('', { shownError, error });
    //     // return res.status(400).send({
    //     //   success: false,
    //     //   message: shownError
    //     // });
    //   }

      return res.status(400).send({
        success: false,
        // remove double quotes and escape characters from the message, e.g. \"username\" => Username
        message: "Validation failed"
      });
    }
  };

export default validator;