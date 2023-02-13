import { DynamoDB } from "aws-sdk";
import { Accutane } from "../../../../types/Accutane";
import { logInfo } from "../../../../utils/logger";
import getAccutaneQuery from "../../queries/get";

const dynamoDb = new DynamoDB.DocumentClient();

export const deleteItem = async (id: string): Promise<void> => {
  logInfo("Deleting accutane record from DB", { id });
  const { Attributes } = await dynamoDb.delete(getAccutaneQuery(id)).promise();

  logInfo(`Accutane record was deleted`, Attributes);
};
