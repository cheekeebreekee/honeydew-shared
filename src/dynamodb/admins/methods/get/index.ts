import { DynamoDB } from "aws-sdk";
import { EnrollmentCoordinator } from "src/types/EnrollmentCoordinator";
import { logError, logInfo } from "../../../../../../utils/logger";
import getEnrollmentCoordinatorQuery from "../../queries/get";

const dynamoDb = new DynamoDB.DocumentClient();

export const get = async (id: string): Promise<EnrollmentCoordinator> => {
  logInfo("Getting admin from DB", { id });
  const { Item } = await dynamoDb
    .get(getEnrollmentCoordinatorQuery(id))
    .promise();

  if (!Item) {
    const message = `Admin with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo(`admin found`, Item);

  return Item as EnrollmentCoordinator;
};
