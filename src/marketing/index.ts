import { SQS } from "aws-sdk";
import { ENV } from "src/constants";
import { Patient } from "../types/Patient";
import { logInfo } from "../utils/logger";

const sqs = new SQS({ apiVersion: "latest" });

async function setStatusTag(
  patient: Patient,
  statusName: string,
  isActive: boolean
) {
  logInfo("Setting marketing tag to the patient", {
    patient,
    statusName,
    isActive,
  });
  await sqs
    .sendMessage({
      QueueUrl: ENV.MARKETING_SERVICE_SQS_URL,
      MessageBody: JSON.stringify({
        patientId: patient.id,
        tag: statusName,
        add: isActive,
      }),
    })
    .promise();
}

export const MarketingService = {
  setStatusTag,
};
