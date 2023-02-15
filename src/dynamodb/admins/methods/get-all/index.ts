import { DynamoDB } from "aws-sdk";
import { EnrollmentCoordinator } from "src/types/EnrollmentCoordinator";
import { ENV } from "../../../../shared/constants";
import { logInfo, logWarn } from "../../../../utils/logger";

const dynamoDb = new DynamoDB.DocumentClient();

export const getAll = async (): Promise<EnrollmentCoordinator[]> => {
  logInfo("Getting all admins from DB");
  const { Items } = await dynamoDb
    .scan({ TableName: ENV.ADMIBS_TABLE })
    .promise();

  if (Items) {
    logInfo("Admins found", {
      count: Items.length,
    });
    return Items as EnrollmentCoordinator[];
  }

  logWarn("No admins found");
  return [];
};
