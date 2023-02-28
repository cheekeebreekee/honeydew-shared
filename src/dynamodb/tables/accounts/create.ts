import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { config } from "../../../shared";
import { Account } from "../../../types/Account";
import { logInfo } from "../../../utils/logger";

const dynamoDb = new DynamoDB({});

export const create = async (account: Account) => {
  logInfo(`Create an account in DB`, account);

  const query = {
    TableName: config.getSharedValue("accountsTableName"),
    Item: marshall(account),
  };

  logInfo("Create account query", query);

  await dynamoDb.putItem(query);

  logInfo("Account has been created successfully");
};
