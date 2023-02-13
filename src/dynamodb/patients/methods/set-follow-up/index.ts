import { DynamoDB } from "aws-sdk";
import { DynamoDBService } from "../../../index";
import { Patient, SkinImages } from "../../../../types/Patient";
import { logError, logInfo } from "../../../../utils/logger";
import setSkinImagesQuery from "../../queries/set-skin-images";

const dynamoDb = new DynamoDB.DocumentClient();

export const setFollowUp = async (
  payload: Patient | string,
  followUp: SkinImages
) => {
  logInfo("Setting new follow up to patient in DB", { payload, followUp });
  const patient =
    typeof payload === "string"
      ? await DynamoDBService.patients.get(payload)
      : payload;
  logInfo("Patient to update", patient);

  const { skinImages } = patient.medicalBackground;

  if (!skinImages) {
    const message = "Cannot submit follow up for the new patient";
    logError(message);
    throw new Error(message);
  }

  if (!skinImages[skinImages.length - 1].treatmentPlanData) {
    const message = "Follow up was submitted already";
    logError(message);
    throw new Error(message);
  }

  skinImages.push(followUp);

  logInfo("Updated patient's skin images data", skinImages);

  const { Attributes } = await dynamoDb
    .update(setSkinImagesQuery(patient.id, skinImages))
    .promise();
  logInfo("Patient has been updated successfully");

  return Attributes as Patient;
};
