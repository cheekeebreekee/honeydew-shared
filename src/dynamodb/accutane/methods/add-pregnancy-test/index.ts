import { DynamoDB } from "aws-sdk";
import { Accutane, PregnancyTest } from "src/types/Accutane";
import { DynamoDBService } from "../../../index";
import { logError, logInfo } from "../../../../utils/logger";
import addPregnancyTestQuery from "../../queries/add-pregnancy-test";

const dynamoDb = new DynamoDB.DocumentClient();

export const addPregnancyTest = async (id: string, pregnancyTest: PregnancyTest) => {
  logInfo("Adding pregnancy test", pregnancyTest);

  const accutane = await DynamoDBService.accutane.get(id);

  if (!accutane.id) {
    const message = "Accutane record not found in database";
    logError(message);
    throw new Error(message);
  }

  logInfo("Adding pregnancy test info to accutane record", accutane);

  const { Attributes } = await dynamoDb.update(addPregnancyTestQuery(id, pregnancyTest)).promise();

  logInfo("pregnancy test was successfully added to accutane record", Attributes);
  return Attributes as Accutane;
};
