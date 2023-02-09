import { DynamoDB } from "aws-sdk";
import { Accutane, BloodWork } from "src/types/Accutane";
import { DynamoDBService } from "../../../..";
import { logError, logInfo } from "../../../../../../utils/logger";
import addBloodWorkQuery from "../../queries/add-blood-work";

const dynamoDb = new DynamoDB.DocumentClient();

export const addBloodWork = async (id: string, bloodWork: BloodWork) => {
  logInfo("Adding blood work", bloodWork);

  const accutane = await DynamoDBService.accutane.get(id);

  if (!accutane.id) {
    const message = "Accutane record not found in database";
    logError(message);
    throw new Error(message);
  }

  logInfo("Adding blood work info to accutane record", accutane);

  const { Attributes } = await dynamoDb
    .update(addBloodWorkQuery(id, bloodWork))
    .promise();

  logInfo("blood work was successfully added to accutane record", Attributes);
  return Attributes as Accutane;
};
