import { DynamoDB } from "aws-sdk";
import { CareCoordinator } from "../../../../types/CareCoordinator";
import { logError, logInfo } from "../../../../utils/logger";
import getCareCoordinatorQuery from "../../queries/get";

const dynamoDb = new DynamoDB.DocumentClient();

export const get = async (id: string): Promise<CareCoordinator> => {
  logInfo("Getting care coordinator from DB", { id });
  const { Item } = await dynamoDb.get(getCareCoordinatorQuery(id)).promise();

  if (!Item) {
    const message = `Care coordinator with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo(`Care coordinator found`, Item);

  return Item as CareCoordinator;
};
