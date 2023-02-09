import { DynamoDB } from "aws-sdk";
import { Patient } from "../../../../../../types/Patient";
import { logError, logInfo } from "../../../../../../utils/logger";
import getByPatientEmailQuery from "../../queries/get-by-email";

const dynamoDb = new DynamoDB.DocumentClient();

export const getByEmail = async (email: string): Promise<Patient> => {
  logInfo("Getting patient from DB by email", { email });
  const { Items } = await dynamoDb
    .scan(getByPatientEmailQuery(email))
    .promise();

  if (!Items) {
    const message = `Patient with email ${email} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo(`Patient found`, Items);

  return Items[0] as Patient;
};
