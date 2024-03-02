import { QueueContent, QueueName, QueueRequest } from "../domain/entities";
import { BrokerRepository } from "../domain/repositories/brokerRepository";

export class SendMessageService {
    constructor(private readonly brokerRepository: BrokerRepository) {}
    async execute(data: QueueContent, queueName: QueueName) {
        try {
            const queueRequest : QueueRequest  = {
                queueName: queueName,
                content: data
            }

            this.brokerRepository.sendMessage(queueRequest);
            
        } catch (error : any) {
            throw new Error(error)
        }
    }
}