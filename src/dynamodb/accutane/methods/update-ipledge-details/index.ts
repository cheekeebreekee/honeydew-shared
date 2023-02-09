import { DynamoDB } from "aws-sdk";
import { Accutane, IPledgeConsent } from "src/types/Accutane";
import { Patient } from "src/types/Patient";
import { DynamoDBService } from "../../../..";
import { logError, logInfo } from "../../../../../../utils/logger";
import updateIPledgeDetailsQuery from "../../queries/update-ipledge-details";

const dynamoDb = new DynamoDB.DocumentClient();

export const updateIPledgeDetails = async (
  patient: Patient,
  {
    lastConfirmationDate,
    nextConfirmationDate,
    enrollmentDate,
    remsNumber,
  }: Partial<Accutane>
) => {
  logInfo("Updating IPledge details of Accutane record", patient.id);

  const accutane = await DynamoDBService.accutane.getByPatientId(patient.id);

  if (!accutane.id) {
    const message = "Accutane record not found in database";
    logError(message);
    throw new Error(message);
  }

  logInfo("Updating IPledge details in Accutane record", accutane);

  const query = updateIPledgeDetailsQuery(accutane.id, {
    lastConfirmationDate,
    nextConfirmationDate,
    enrollmentDate,
    remsNumber,
  });

  const { Attributes } = await dynamoDb.update(query).promise();

  logInfo("IPledge details was successfully updated", Attributes);
  return Attributes as Accutane;
};
