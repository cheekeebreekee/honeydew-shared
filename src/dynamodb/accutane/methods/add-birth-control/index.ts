import { DynamoDB } from "aws-sdk";
import { Accutane, BirthControl } from "src/types/Accutane";
import { DynamoDBService } from "../../../index";
import { logError, logInfo } from "../../../../utils/logger";
import addBirthControlQuery from "../../queries/add-birth-control";

const dynamoDb = new DynamoDB.DocumentClient();

export const addBirthControl = async (id: string, birthControl: BirthControl) => {
  logInfo("Adding birth control", birthControl);

  const accutane = await DynamoDBService.accutane.get(id);

  if (!accutane.id) {
    const message = "Accutane record not found in database";
    logError(message);
    throw new Error(message);
  }

  logInfo("Adding birth control info to accutane record", accutane);

  const { Attributes } = await dynamoDb.update(addBirthControlQuery(id, birthControl)).promise();

  logInfo("Birth control was successfully added to accutane record", Attributes);
  return Attributes as Accutane;
};
