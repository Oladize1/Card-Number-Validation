import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error.js";
import { isvalidcardNumber } from "../services/card-validation.service.js";

export const cardValidationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cardNumber } = req.body;
    if (!cardNumber || typeof cardNumber !== "string") {
      throw new AppError("card number is required ", 400);
    }

    const validation = isvalidcardNumber(cardNumber);
   
    res.status(200).json({
      status: "success",
      statusCode: 200,
      isValid: validation.isValid,
      message: validation.message,
    });
  } catch (error) {
    next(error);
  }
};
