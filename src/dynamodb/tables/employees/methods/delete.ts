import { DynamoDB } from "aws-sdk";
import { logInfo } from "../../../../utils/logger";

const dynamoDb = new DynamoDB.DocumentClient();

export const remove = (tableName: string) => async (id: string) => {
  logInfo("Delete employee from DB", { id });

  const query = {
    TableName: tableName,
    Key: {
      id,
    },
  };

  logInfo("Delete employee from DB query", query);

  await dynamoDb.delete(query).promise();

  logInfo("Employee has been deleted successfully");
};
