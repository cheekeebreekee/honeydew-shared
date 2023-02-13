import { DynamoDB } from "aws-sdk";
import { CareCoordinator } from "../../../../types/CareCoordinator";
import { logInfo } from "../../../../utils/logger";
import createCareCoordinatorQuery from "../../queries/create";

const dynamoDb = new DynamoDB.DocumentClient();

export const create = async (careCoordinator: CareCoordinator) => {
  logInfo("Creating care coordinator in DB", careCoordinator);
  await dynamoDb.put(createCareCoordinatorQuery(careCoordinator)).promise();
  logInfo("Created successfully");
};
