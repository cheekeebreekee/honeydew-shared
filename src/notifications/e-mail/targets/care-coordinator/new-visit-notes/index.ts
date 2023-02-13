import { SES } from "aws-sdk";
import { CareCoordinator } from "../../../../../types/CareCoordinator";
import { logInfo } from "../../../../../utils/logger";
import { DynamoDBService } from "../../../../../dynamodb";
import { newVisitNotesSubmittedEmailTemplate } from "../../../templates/new-visit-notes";

const sesPublisher = new SES({ region: "us-east-1" });

export const newVisitNotes = async (payload: CareCoordinator | string) => {
  logInfo("Sending email to care coordinator about new visit notes submitted");
  const careCoordinator =
    typeof payload === "string"
      ? await DynamoDBService.careCoordinators.get(payload)
      : payload;

  logInfo("Care coordinator to notify", careCoordinator);

  const query = newVisitNotesSubmittedEmailTemplate(
    careCoordinator.email,
    `${careCoordinator.firstName} ${careCoordinator.lastName}`
  );

  await sesPublisher.sendEmail(query).promise();
  logInfo("Email message sent successfully");
};
