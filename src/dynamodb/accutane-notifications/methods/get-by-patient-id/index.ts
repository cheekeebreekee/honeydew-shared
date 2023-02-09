import { DynamoDB } from "aws-sdk";
import { AccutaneNotification } from "../../../../../../types/AccutaneNotification";
import { logError, logInfo } from "../../../../../../utils/logger";
import getByPatientIdQuery from "../../queries/get-by-patient-id";

const dynamoDb = new DynamoDB.DocumentClient();

export const getByPatientId = async (
  id: string
): Promise<AccutaneNotification | null> => {
  logInfo("Getting Accutane notification from DB by patient ID", { id });
  const { Items } = await dynamoDb.scan(getByPatientIdQuery(id)).promise();

  if (!Items) {
    const message = `Accutane notification with patient ID ${id} is not found`;
    logError(message);
    return null;
  }

  logInfo(`Accutane notification found`, Items);

  return Items[0] as AccutaneNotification;
};
