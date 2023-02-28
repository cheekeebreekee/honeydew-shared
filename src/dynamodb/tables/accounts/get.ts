import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { config } from "../../../shared";
import { Account } from "../../../types/Account";
import { logError, logInfo } from "../../../utils/logger";

const dynamoDb = new DynamoDB({});

export const get = async (id: string): Promise<Account> => {
  logInfo("Getting patient from DB", { id });

  const query = {
    TableName: config.getSharedValue("accountsTableName"),
    Key: marshall({
      id,
    }),
  };

  logInfo("Getting patient from DB query", query);

  const { Item } = await dynamoDb.getItem(query);

  if (!Item) {
    const message = `Patient with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo("Patient found", Item);

  return unmarshall(Item) as Account;
};
