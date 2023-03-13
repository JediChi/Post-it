import express, {Request, Response} from "express";

const docRouter = express.Router()

docRouter.get("/", async(req: Request, res: Response) => {
    res.redirect("https://documenter.getpostman.com/view/25794905/2s93Jus2gD")
})

export default docRouter