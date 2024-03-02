import { QueueName, QueueContent } from "./index";

export interface QueueRequest {
    queueName: QueueName;
    content: QueueContent;
}