import { DynamoDB } from "aws-sdk";
import { DynamoDBService } from "../../../index";
import { Patient, TreatmentPlanData } from "../../../../types/Patient";
import { logInfo } from "../../../../utils/logger";
import setSkinImagesQuery from "../../queries/set-skin-images";

const dynamoDb = new DynamoDB.DocumentClient();

export const setTreatmentPlan = async (
  id: string,
  treatmentPlanData: TreatmentPlanData
) => {
  logInfo("Setting new treatment plan to the patient in DB", {
    id,
    treatmentPlanData,
  });
  const patient = await DynamoDBService.patients.get(id);

  logInfo("Patient to update", patient);

  let { skinImages } = patient.medicalBackground;

  if (!skinImages) {
    skinImages = [
      {
        timestamp: Date.now(),
        list: [],
      },
    ];
  }

  const lastSkinImages = skinImages[skinImages.length - 1];

  lastSkinImages.treatmentPlanData = treatmentPlanData;

  logInfo("Updated skin images of the patient data", skinImages);

  const { Attributes } = await dynamoDb
    .update(setSkinImagesQuery(id, skinImages))
    .promise();
  logInfo("Patient has been updated successfully");
  return Attributes as Patient;
};
