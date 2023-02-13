import { DynamoDB } from "aws-sdk";
import { DynamoDBService } from "../../../index";
import { CareCoordinator } from "../../../../types/CareCoordinator";
import { logError, logInfo } from "../../../../utils/logger";
import updateCareCoordinatorQuery from "../../queries/update";

const dynamoDb = new DynamoDB.DocumentClient();

export const update = async (
  careCoordinatorPartial: Partial<CareCoordinator>
) => {
  logInfo("Updating care coordinator", careCoordinatorPartial);

  if (!careCoordinatorPartial.id) {
    const message = "Care Coordinator ID is not found in partial";
    logError(message);
    throw new Error(message);
  }

  const careCoordinator = await DynamoDBService.careCoordinators.get(
    careCoordinatorPartial.id
  );

  logInfo("Care coordinator to update", careCoordinator);

  const updatedCareCoordinator: CareCoordinator = {
    ...careCoordinator,
    ...careCoordinatorPartial,
  };

  logInfo("Data to upate", updatedCareCoordinator);
  const { Attributes } = await dynamoDb
    .update(updateCareCoordinatorQuery(updatedCareCoordinator))
    .promise();

  logInfo("Care coordinator has been updated successfully");
  return Attributes as CareCoordinator;
};
