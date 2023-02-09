import { DynamoDB } from "aws-sdk";
import { Patient, PatientNote } from "../../../../../../types/Patient";
import setAccutaneFlagQuery from "../../queries/set-accutane-flag";
import getPatientQuery from "../../queries/get";
import { logInfo } from "../../../../../../utils/logger";

const dynamoDb = new DynamoDB.DocumentClient();

export const setAccutane = async (id: string, accutaneFlag: boolean) => {
  logInfo("Setting accutane flag to patient in DB", { id, accutaneFlag });
  const { Item: patient } = await dynamoDb.get(getPatientQuery(id)).promise();
  logInfo("Patient to set accutane flag to", patient);

  const { Attributes } = await dynamoDb
    .update(setAccutaneFlagQuery(id, accutaneFlag))
    .promise();

  logInfo("Accutane flag has been set to patient in DB");
  return Attributes as Patient;
};
