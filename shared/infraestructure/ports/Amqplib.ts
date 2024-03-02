import amqp from "amqplib";
import { Connection } from "amqplib/callback_api";
import { Channel } from "amqplib/callback_api";
import { QueueRequest } from "../../domain/entities";
import { BrokerRepository } from "../../domain/repositories/brokerRepository";

export class Amqplib implements BrokerRepository {
    constructor(private readonly url: string) {}

    async connection(): Promise<Connection> {
        return new Promise<Connection> ((resolve, reject) => {
            amqp.connect(this.url, (error: any, connection: Connection) => {
                if ( error ) reject (error);
                console.log('connection');
                resolve(connection)
            })
        });
    }

    async createChannel(): Promise<Channel> {
        try {
            const conn = await this.connection();
            return new Promise<Channel>((resolve, reject) => {
                conn.createChannel((errChanel: any, channel: Channel) => {
                    if ( errChanel ) reject(errChanel);
                    resolve(channel);
                })
            })
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async sendMessage(req: QueueRequest): Promise<void> {
        const { queueName, content } = req;
        try {
            const channel = await this.createChannel();
            await channel.assertQueue(queueName);
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(content)), {
                persistent: true,
            });
           
        } catch (error: any) {
            throw new Error(error);
        }
    }
}