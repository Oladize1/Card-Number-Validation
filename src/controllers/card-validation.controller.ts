import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error.js";
import { isvalidcardNumber } from "../services/card-validation.service.js";
import {
  cardValidationRequestBody,
  cardValidationResponseBody,
} from "../types/card-validation.types.js";
export const cardValidationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cardNumber }: Partial<cardValidationRequestBody> = req.body;
    if (!cardNumber || typeof cardNumber !== "string") {
      throw new AppError("card number is required ", 400);
    }

    const validation = isvalidcardNumber(cardNumber);
    const responseBody: cardValidationResponseBody = {
      status: "success",
      statusCode: 200,
      isValid: validation.isValid,
      message: validation.message,
    };
    res.status(200).json(responseBody);
  } catch (error) {
    next(error);
  }
};
