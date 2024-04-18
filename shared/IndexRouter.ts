import orderRouter from "../order/infraestructure/orderRouter";
import { Router } from "express";

export const indexRouter = Router();

indexRouter.use('/api/order', orderRouter);