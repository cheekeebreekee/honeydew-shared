import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (id: string): DynamoDB.DocumentClient.DeleteItemInput => {
  const query = {
    TableName: ENV.ENROLLMENT_COORDINATORS_TABLE,
    Key: {
      id,
    },
  };
  logInfo("DynamoDB query", query);
  return query;
};
