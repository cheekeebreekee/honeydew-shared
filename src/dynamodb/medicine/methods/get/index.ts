import { DynamoDB } from "aws-sdk";
import { Medicine } from "../../../../../../types/Medicine";
import { logError, logInfo } from "../../../../../../utils/logger";
import getMedicineQuery from "../../queries/get";

const dynamoDb = new DynamoDB.DocumentClient();

export const get = async (id: string) => {
  logInfo("Getting medicine from DB", { id });
  const { Item } = await dynamoDb.get(getMedicineQuery(id)).promise();

  if (!Item) {
    const message = `Medicine with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo("Medicine found", Item);

  return Item as Medicine;
};
