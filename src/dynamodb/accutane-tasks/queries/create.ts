import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { AccutaneTask } from "../../../types/AccutaneTask";
import { logInfo } from "../../../utils/logger";

export default (task: AccutaneTask): DynamoDB.DocumentClient.PutItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TASKS_TABLE,
    Item: task,
  };
  logInfo("DynamoDB query", query);
  return query;
};
