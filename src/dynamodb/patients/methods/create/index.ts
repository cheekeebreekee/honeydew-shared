import { DynamoDB } from "aws-sdk";
import { Patient } from "../../../../types/Patient";
import { logInfo } from "../../../../utils/logger";
import createPatientQuery from "../../queries/create";

const dynamoDb = new DynamoDB.DocumentClient();

export const create = async (patient: Patient) => {
  logInfo("Creating patient in DB", patient);
  await dynamoDb.put(createPatientQuery(patient)).promise();
  logInfo("Patient has been successfully created in DB");
};
