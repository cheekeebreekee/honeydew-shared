import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { EnrollmentCoordinator } from "../../../../../types/EnrollmentCoordinator";
import { logInfo } from "../../../../../utils/logger";

export default (
  enrollmentCoordinator: EnrollmentCoordinator
): DynamoDB.DocumentClient.PutItemInput => {
  const query = {
    TableName: ENV.ENROLLMENT_COORDINATORS_TABLE,
    Item: enrollmentCoordinator,
  };
  logInfo("DynamoDB query", query);
  return query;
};
