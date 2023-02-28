import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { config } from "../../../shared";
import { Account } from "../../../types/Account";
import { logInfo, logWarn } from "../../../utils/logger";

const dynamoDb = new DynamoDB({});

export const getAll = async (): Promise<Account[]> => {
  logInfo("Getting all accounts from DB");

  const { Items } = await dynamoDb.scan({ TableName: config.getSharedValue("accountsTableName") });

  if (Items) {
    logInfo("Found accounts count", { count: Items.length });
    return Items.map((it) => unmarshall(it)) as Account[];
  }

  logWarn("No accounts found in DB");
  return [];
};
