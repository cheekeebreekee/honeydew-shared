import { DynamoDB } from "aws-sdk";
import { DynamoDBService } from "../../../index";
import { Patient } from "../../../../types/Patient";
import { logError, logInfo } from "../../../../utils/logger";
import setSkinImagesQuery from "../../queries/set-skin-images";

const dynamoDb = new DynamoDB.DocumentClient();

export const markAsNotifiedAboutUpcomingFollowUp = async (
  payload: Patient | string
) => {
  logInfo("Marking patient as notified about upcoming follow up in DB", {
    payload,
  });
  const patient =
    typeof payload === "string"
      ? await DynamoDBService.patients.get(payload)
      : payload;
  logInfo("Patient to update", patient);

  const { skinImages } = patient.medicalBackground;

  if (!skinImages) {
    const message =
      "Cannot update upcoming follow up notification flag: patient doesn't have follow ups";
    logError(message, patient);
    throw new Error(message);
  }

  const lastTreatmentPlan = skinImages[skinImages.length - 1].treatmentPlanData;

  if (!lastTreatmentPlan) {
    const message =
      "Cannot update upcoming follow up notification flag: patient doesn't have treatment plan yet";
    logError(message, patient);
    throw new Error(message);
  }

  lastTreatmentPlan.isUserNotifiedAboutFollowUp = true;
  logInfo("Updated last treatment plan data", lastTreatmentPlan);
  const { Attributes } = await dynamoDb
    .update(setSkinImagesQuery(patient.id, skinImages))
    .promise();
  logInfo("Patient has been updated successfuly");
  return Attributes as Patient;
};
