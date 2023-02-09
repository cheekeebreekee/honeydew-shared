import { DynamoDB } from "aws-sdk";
import { logInfo } from "../../../../../../utils/logger";
import updateTimeQuery from "../../queries/update-time";

const dynamoDb = new DynamoDB.DocumentClient();

export const updateTime = async (id: string, updatedTime: number) => {
  logInfo("Updating time in accutane notification record", {
    id,
    updatedTime,
  });

  const updatedNotification = await dynamoDb
    .update(updateTimeQuery(id, updatedTime))
    .promise();

  logInfo("Time was updated successfully", updatedNotification);
};
