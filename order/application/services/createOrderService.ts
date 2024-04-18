import { Order } from "../../domain/entities/order";
import { QueueName } from "../../../shared/broker/domain/entities";
import { SendMessageService } from "../../../shared/broker/application/sendMessageService";

export class CreateOrderService {
    constructor(private readonly sendMessageService: SendMessageService) {}
    async execute(order : Order) : Promise<Order> {
        try {
            await this.sendMessageService.execute(order, QueueName.BASE);
            return order;
        } catch (error : any) {
            throw new Error(error);
        }
    }
}