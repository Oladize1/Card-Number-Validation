import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/app-error.js"
export const cardValidationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {cardNumber} = req.body
        if (!cardNumber || typeof cardNumber !== "string") {
            throw new AppError("card number is required ", 400)
        }
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "message will be here"
        })
    } catch (error) {
        next(error)
    }
}