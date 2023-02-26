import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { logInfo } from "../../../../utils/logger";

const dynamoDb = new DynamoDB({});

export const remove = (tableName: string) => async (id: string) => {
  logInfo("Delete employee from DB", { id });

  const query = {
    TableName: tableName,
    Key: marshall({
      id,
    }),
  };

  logInfo("Delete employee from DB query", query);

  await dynamoDb.deleteItem(query);

  logInfo("Employee has been deleted successfully");
};
