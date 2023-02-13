import { DynamoDB } from "aws-sdk";
import { Accutane } from "../../../../types/Accutane";
import { logError, logInfo } from "../../../../utils/logger";
import getByPatientIdQuery from "../../queries/get-by-patient-id";

const dynamoDb = new DynamoDB.DocumentClient();

export const getByPatientId = async (id: string): Promise<Accutane | null> => {
  logInfo("Getting Accutane from DB by patient ID", { id });
  const { Items } = await dynamoDb.query(getByPatientIdQuery(id)).promise();

  if (!Items) {
    const message = `Accutane with patient ID ${id} is not found`;
    logError(message);
    return null;
  }

  logInfo(`Accutane found`, Items);

  return Items[0] as Accutane;
};
