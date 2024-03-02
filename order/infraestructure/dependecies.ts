import { SendMessageService } from "../../shared/application/sendMessage";
import { Amqplib } from "../../shared/infraestructure/ports/Amqplib";
import { CreateOrderService } from "../application/services/createOrderService";
import { CreateOrderController } from "./controllers/createOrderController";

const amqp = new Amqplib("amqp://44.208.6.233");

const sendMessageService = new SendMessageService(amqp);

const createdOrderService = new CreateOrderService(sendMessageService);

export const createOrderController = new CreateOrderController(createdOrderService);
