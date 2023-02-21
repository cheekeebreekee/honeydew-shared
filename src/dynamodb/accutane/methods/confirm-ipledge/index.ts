import { DynamoDB } from "aws-sdk";
import { Accutane, IPledgeConsent, Patient } from "../../../../types";
import { DynamoDBService } from "../../../index";
import { logError, logInfo } from "../../../../utils/logger";
import confirmIPledgeMaleQuery from "../../queries/confirm-ipledge-male";
import confirmIPledgeFemaleQuery from "../../queries/confirm-ipledge-female";

const dynamoDb = new DynamoDB.DocumentClient();

export const confirmIpledge = async (patient: Patient, confirmed: boolean) => {
  logInfo("Confirming IPledge of Accutane record", patient.id);

  const accutane = await DynamoDBService.accutane.getByPatientId(patient.id);

  if (!accutane) {
    const message = "Accutane record not found in database";
    logError(message);
    throw new Error(message);
  }

  logInfo("Confirming IPledge in Accutane record", accutane);

  const query =
    accutane.gender === "Female"
      ? confirmIPledgeFemaleQuery(patient, accutane, confirmed)
      : confirmIPledgeMaleQuery(patient, accutane, confirmed);

  const { Attributes } = await dynamoDb.update(query).promise();

  logInfo("IPledge was successfully confirmed", Attributes);
  return Attributes as Accutane;
};
