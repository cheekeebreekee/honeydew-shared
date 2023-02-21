import { DynamoDB } from "aws-sdk";
import { Accutane } from "../../../../types";
import { DynamoDBService } from "../../../index";
import { logError, logInfo } from "../../../../utils/logger";
import setRemsNumberQuery from "../../queries/set-rems-number";

const dynamoDb = new DynamoDB.DocumentClient();

export const setRemsNumber = async (id: string, remsNumber: string) => {
  logInfo("Setting REMS number", remsNumber);

  const accutane = await DynamoDBService.accutane.get(id);

  if (!accutane.id) {
    const message = "Accutane record not found in database";
    logError(message);
    throw new Error(message);
  }

  logInfo("Setting REMS number to accutane record", accutane);

  const { Attributes } = await dynamoDb.update(setRemsNumberQuery(id, remsNumber)).promise();

  logInfo("REMS number was successfully set to accutane record", Attributes);
  return Attributes as Accutane;
};
