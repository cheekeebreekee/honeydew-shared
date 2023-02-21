import { DynamoDB } from "aws-sdk";
import { Accutane, BloodWork } from "../../../../types";
import { DynamoDBService } from "../../../index";
import { logError, logInfo } from "../../../../utils/logger";
import confirmBloodWorkQuery from "../../queries/confirm-blood-work";

const dynamoDb = new DynamoDB.DocumentClient();

export const confirmBloodWork = async (patientId: string, confirmed: boolean) => {
  logInfo("Confirming blood work of Accutane record", patientId);

  const accutane = await DynamoDBService.accutane.getByPatientId(patientId);

  if (!accutane?.id) {
    const message = "Accutane record not found in database";
    logError(message);
    throw new Error(message);
  }

  logInfo("Confirming blood work in Accutane record", accutane);

  const { Attributes } = await dynamoDb
    .update(confirmBloodWorkQuery(accutane?.id, confirmed))
    .promise();

  logInfo("blood work was successfully added to accutane record", Attributes);
  return Attributes as Accutane;
};
