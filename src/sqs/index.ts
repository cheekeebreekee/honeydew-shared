import { SQS } from "@aws-sdk/client-sqs";
import { v4 as uuidv4 } from "uuid";
import { logDebug, logInfo } from "../utils";

const sqsClient = new SQS({});

const queues = {
  stripeEventsQueueName: "stripe-events",
};

const sendMessage = async (
  message: Record<string, any> | Record<string, any>[],
  queueName: string
) => {
  logInfo("Sending messages to SQS", {
    message,
    queueName,
  });
  if (!message || (Array.isArray(message) && !message.length)) {
    throw new Error(`Empty message provided to be sent to SQS`);
  }

  const { QueueUrl } = await sqsClient.getQueueUrl({
    QueueName: queueName,
  });
  if (!QueueUrl) {
    throw new Error(
      `Unable to send message to SQS: No Queue URL found for Queue name "${queueName}"`
    );
  }

  if (Array.isArray(message)) {
    logDebug("Sending message to SQS as batch");
    await sqsClient.sendMessageBatch({
      QueueUrl,
      Entries: message.map((item) => ({
        Id: uuidv4(),
        MessageBody: JSON.stringify(item),
      })),
    });
  } else {
    logDebug("Sending message to SQS as single");
    await sqsClient.sendMessage({
      QueueUrl,
      MessageBody: JSON.stringify(message),
    });
  }
  logDebug("SQS message sent successfully");
};

export const sqs = {
  queues,
  sendMessage,
};
