import orderRouter from "../../order/infraestructure/orderRouter";
import { Router, Request, Response } from "express";

export const indexRouter = Router();

indexRouter.use('/api/order', orderRouter);

indexRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send('Service Order');
})
