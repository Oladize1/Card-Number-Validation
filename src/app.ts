import express from "express";
import { cardValidationRouter } from "./routes/card-validation.route.js";
import { errorHandler } from "./middleware/error-handler.middleware.js";
export const app = express()

app.use(express.json())

app.use("/api", cardValidationRouter)

app.use(errorHandler)
