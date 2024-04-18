import amqplib from "amqplib";
import { Connection, Channel } from "amqplib/callback_api";
import { QueueRequest } from "../../domain/entities";
import { BrokerRepository } from "../../domain/repositories/brokerRepository";

export class Amqplib implements BrokerRepository {
  constructor(private readonly url: string) {}

  async connection(): Promise<any> {
    return new Promise<Connection>(async (resolve, reject) => {
      try {
        const conn = await amqplib.connect(this.url);
        resolve(conn);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createChannel(): Promise<any> {
    return new Promise<Channel>(async (resolve, reject) => {
      try {
        const conn = await this.connection();
        const channel = await conn.createChannel();
        resolve(channel);
      } catch (error) {
        reject(error);
      }
    });
  }

  async sendMessage(req: QueueRequest): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const channel = await this.createChannel();
        const { queueName, content } = req;
        await channel.assertQueue(queueName);
        await channel.sendToQueue(
          queueName,
          Buffer.from(JSON.stringify(content))
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
