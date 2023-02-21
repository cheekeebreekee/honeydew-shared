import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../shared/constants";
import { CareCoordinator } from "../../../../types/CareCoordinator";
import { logInfo, logWarn } from "../../../../utils/logger";

const dynamoDb = new DynamoDB.DocumentClient();

export const getAll = async (): Promise<CareCoordinator[]> => {
  logInfo("Getting all care coordinators from DB");
  const { Items } = await dynamoDb.scan({ TableName: ENV.CARE_COORDINATORS_TABLE }).promise();

  if (Items) {
    logInfo("Care coordinators found", {
      count: Items.length,
    });
    return Items as CareCoordinator[];
  }

  logWarn("No care coordinators found");
  return [];
};
