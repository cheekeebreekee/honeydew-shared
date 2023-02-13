import { SES } from "aws-sdk";
import { CareCoordinator } from "../../../../../types/CareCoordinator";
import { logInfo } from "../../../../../utils/logger";
import { DynamoDBService } from "../../../../../dynamodb";
import { newCareCoordinatorAccountEmailTemplate } from "../../../templates/new-care-coordinator-account";

const sesPublisher = new SES({ region: "us-east-1" });

export const newAccount = async (
  payload: CareCoordinator | string,
  password: string
) => {
  logInfo("Sending Email to care coordinator about new account", {
    payload,
    password,
  });
  const careCoordinator =
    typeof payload === "string"
      ? await DynamoDBService.careCoordinators.get(payload)
      : payload;
  logInfo("Care coordinator to notify", careCoordinator);

  const query = newCareCoordinatorAccountEmailTemplate(
    careCoordinator,
    password
  );

  await sesPublisher.sendEmail(query).promise();
  logInfo("Email message sent successfully");
};
