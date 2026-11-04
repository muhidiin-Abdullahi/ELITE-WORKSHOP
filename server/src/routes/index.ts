import { Router } from "express";
import { contactRouter } from "./contact.routes";
import { healthRouter } from "./health.routes";
import { quotesRouter } from "./quotes.routes";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(contactRouter);
apiRouter.use(quotesRouter);
