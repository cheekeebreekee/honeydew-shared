import { SQS } from "@aws-sdk/client-sqs";
import { Patient } from "../types/Patient";
import { logInfo } from "../utils/logger";

const sqs = new SQS({ apiVersion: "latest" });

async function setStatusTag(patient: Patient, statusName: string, isActive: boolean) {
  logInfo("Setting marketing tag to the patient", {
    patient,
    statusName,
    isActive,
  });
  await sqs.sendMessage({
    QueueUrl: "",
    MessageBody: JSON.stringify({
      patientId: patient.id,
      tag: statusName,
      add: isActive,
    }),
  });
}

export const MarketingService = {
  setStatusTag,
};
