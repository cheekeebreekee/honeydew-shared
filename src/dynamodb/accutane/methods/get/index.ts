import { DynamoDB } from "aws-sdk";
import { Accutane } from "../../../../../../types/Accutane";
import { logError, logInfo } from "../../../../../../utils/logger";
import getAccutaneQuery from "../../queries/get";

const dynamoDb = new DynamoDB.DocumentClient();

export const get = async (id: string): Promise<Accutane> => {
  logInfo("Getting accutane record from DB", { id });
  const { Item } = await dynamoDb.get(getAccutaneQuery(id)).promise();

  if (!Item) {
    const message = `Accutane record with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo(`Accutane record found`, Item);

  return Item as Accutane;
};
