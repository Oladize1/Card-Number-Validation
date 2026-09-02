import express from "express";
import { cardValidationController } from "../controllers/card-validation.controller.js";
export const cardValidationRouter = express.Router()

cardValidationRouter.post("/validate", cardValidationController)
