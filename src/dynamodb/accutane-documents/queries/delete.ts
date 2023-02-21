import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (id: string, compositeKey: string): DynamoDB.DocumentClient.DeleteItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_DOCUMENTS_TABLE,
    Key: {
      id,
      compositeKey,
    },
  };
  logInfo("DynamoDB query", query);
  return query;
};
