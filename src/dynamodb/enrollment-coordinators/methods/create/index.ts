import { DynamoDB } from "aws-sdk";
import { EnrollmentCoordinator } from "src/types/EnrollmentCoordinator";
import { logInfo } from "../../../../../../utils/logger";
import createEnrollmentCoordinatorQuery from "../../queries/create";

const dynamoDb = new DynamoDB.DocumentClient();

export const create = async (enrollmentCoordinator: EnrollmentCoordinator) => {
  logInfo("Creating enrollment coordinator in DB", enrollmentCoordinator);
  await dynamoDb
    .put(createEnrollmentCoordinatorQuery(enrollmentCoordinator))
    .promise();
  logInfo("Created successfully");
};
