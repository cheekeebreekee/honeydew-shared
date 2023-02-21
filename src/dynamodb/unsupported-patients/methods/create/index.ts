import { DynamoDB } from "aws-sdk";
import { UnsupportedPatient } from "../../../../types/Patient";
import { logInfo } from "../../../../utils/logger";
import createUnsupportedPatientQuery from "../../queries/create";

const dynamoDb = new DynamoDB.DocumentClient();

export const create = async (unsupportedPatient: UnsupportedPatient) => {
  logInfo("Creating unsupported patient in DB", unsupportedPatient);
  await dynamoDb.put(createUnsupportedPatientQuery(unsupportedPatient)).promise();
  logInfo("Unsupported patient has been created successfully");
};
