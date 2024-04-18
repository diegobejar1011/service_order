import { SendMessageService } from "../../shared/broker/application/sendMessageService";
import { Amqplib } from "../../shared/broker/infraestructure/ports/Amqplib";
import { CreateOrderService } from "../application/services/createOrderService";
import { CreateOrderController } from "./controllers/createOrderController";

const amqp = new Amqplib("amqp://18.209.192.241/");

const sendMessageService = new SendMessageService(amqp);

const createdOrderService = new CreateOrderService(sendMessageService);

export const createOrderController = new CreateOrderController(createdOrderService);
