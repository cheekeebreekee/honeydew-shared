import { SES } from "aws-sdk";
import { EnrollmentCoordinator } from "src/types/EnrollmentCoordinator";
import { logInfo } from "../../../../../utils/logger";
import { DynamoDBService } from "../../../../../dynamodb";
import { newEnrollmentCoordinatorAccountEmailTemplate } from "../../../templates/new-enrollment-coordinator-account";

const sesPublisher = new SES({ region: "us-east-1" });

export const newAccount = async (
  payload: EnrollmentCoordinator | string,
  password: string
) => {
  logInfo("Sending Email to enrollment coordinator about new account", {
    payload,
    password,
  });
  const enrollmentCoordinator =
    typeof payload === "string"
      ? await DynamoDBService.enrollmentCoordinators.get(payload)
      : payload;
  logInfo("Enrollment coordinator to notify", enrollmentCoordinator);

  const query = newEnrollmentCoordinatorAccountEmailTemplate(
    enrollmentCoordinator,
    password
  );

  await sesPublisher.sendEmail(query).promise();
  logInfo("Email message sent successfully");
};
