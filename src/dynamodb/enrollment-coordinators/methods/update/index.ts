import { DynamoDB } from "aws-sdk";
import { DynamoDBService } from "../../../index";
import { logError, logInfo } from "../../../../utils/logger";
import updateEnrollmentCoordinatorQuery from "../../queries/update";
import { EnrollmentCoordinator } from "../../../../types";

const dynamoDb = new DynamoDB.DocumentClient();

export const update = async (enrollmentCoordinatorPartial: Partial<EnrollmentCoordinator>) => {
  logInfo("Updating enrollment coordinator", enrollmentCoordinatorPartial);

  if (!enrollmentCoordinatorPartial.id) {
    const message = "Enrollment Coordinator ID is not found in partial";
    logError(message);
    throw new Error(message);
  }

  const enrollmentCoordinator = await DynamoDBService.enrollmentCoordinators.get(
    enrollmentCoordinatorPartial.id
  );

  logInfo("Enrollment coordinator to update", enrollmentCoordinator);

  const updatedEnrollmentCoordinator: EnrollmentCoordinator = {
    ...enrollmentCoordinator,
    ...enrollmentCoordinatorPartial,
  };

  logInfo("Data to upate", updatedEnrollmentCoordinator);
  const { Attributes } = await dynamoDb
    .update(updateEnrollmentCoordinatorQuery(updatedEnrollmentCoordinator))
    .promise();

  logInfo("Enrollment coordinator has been updated successfully");
  return Attributes as EnrollmentCoordinator;
};
