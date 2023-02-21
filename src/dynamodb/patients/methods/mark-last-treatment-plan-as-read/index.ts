import { DynamoDB } from "aws-sdk";
import { DynamoDBService } from "../../../index";
import { Patient } from "../../../../types/Patient";
import { logError, logInfo, logWarn } from "../../../../utils/logger";
import setSkinImagesQuery from "../../queries/set-skin-images";

const dynamoDb = new DynamoDB.DocumentClient();

const issuersList = {
  patient: "patient",
  careCoordinator: "careCoordinator",
};

function markAsRead(issuer: string) {
  return async (payload: Patient | string) => {
    logInfo("Marking patient's last treatment plan as read in DB", {
      payload,
      issuer,
    });
    const patient =
      typeof payload === "string" ? await DynamoDBService.patients.get(payload) : payload;
    logInfo("Patient to update", patient);

    const { skinImages } = patient.medicalBackground;

    if (!skinImages) {
      const message = "Cannot mark treatment plan as read: patient have no follow ups";
      logError(message, patient);
      throw new Error(message);
    }

    const { treatmentPlanData } = skinImages[skinImages.length - 1];

    if (!treatmentPlanData) {
      const message = "Cannot mark treatment plan as read: treatment plan is not found";
      logError(message, patient);
      throw new Error(message);
    }

    switch (issuer) {
      case issuersList.patient:
        logInfo("Mark as read by patient");
        treatmentPlanData.isReadByPatient = true;
        break;
      case issuersList.careCoordinator:
        logInfo("Mark as read by care coordinator");
        treatmentPlanData.isReadByCareCoordinator = true;
        break;
      default:
        logWarn(`Unknown issuer "${issuer}"`);
        break;
    }
    logInfo("Updated patient's last treatment plan data", treatmentPlanData);
    const { Attributes } = await dynamoDb
      .update(setSkinImagesQuery(patient.id, skinImages))
      .promise();
    logInfo("Patient has been updated successfully");
    return Attributes as Patient;
  };
}

export const markLastTreatmentPlanAsRead = {
  byPatient: markAsRead(issuersList.patient),
  byCareCoordinator: markAsRead(issuersList.careCoordinator),
};
