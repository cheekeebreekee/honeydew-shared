import { DynamoDB } from "aws-sdk";
import { Accutane } from "../../../../types/Accutane";
import { logError, logInfo } from "../../../../utils/logger";
import getByPatientEmailQuery from "../../queries/get-by-email";

const dynamoDb = new DynamoDB.DocumentClient();

export const getByEmail = async (email: string): Promise<Accutane> => {
  logInfo("Getting Accutane from DB by email", { email });
  const { Items } = await dynamoDb.query(getByPatientEmailQuery(email)).promise();

  if (!Items) {
    const message = `Accutane with email ${email} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo(`Accutane found`, Items);

  return Items[0] as Accutane;
};
