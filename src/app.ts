import express, { Response, Request } from "express";
import { cardValidationRouter } from "./routes/card-validation.route.js";
import { errorHandler } from "./middleware/error-handler.middleware.js";
export const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "ok", message: "Card Number Validation API is running" });
});
app.use("/api", cardValidationRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    statusCode: 404,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use(errorHandler);
