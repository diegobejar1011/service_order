import { Router } from "express";
import { createOrderController } from "./dependecies";

const orderRouter = Router();

orderRouter.post("/", createOrderController.execute.bind(createOrderController));

export default orderRouter;