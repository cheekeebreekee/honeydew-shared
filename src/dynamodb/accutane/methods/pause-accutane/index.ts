import { DynamoDB } from "aws-sdk";
import { Accutane, BloodWork } from "src/types/Accutane";
import { DynamoDBService } from "../../../index";
import { logError, logInfo } from "../../../../utils/logger";
import pauseAccutaneQuery from "../../queries/pause-accutane";

const dynamoDb = new DynamoDB.DocumentClient();

export const pauseAccutane = async (id: string, daysAmount: number) => {
  logInfo("Pausing accutane for provided amount of days", { daysAmount });

  const accutane = await DynamoDBService.accutane.get(id);

  if (!accutane.id) {
    const message = "Accutane record not found in database";
    logError(message);
    throw new Error(message);
  }

  logInfo("Pausing accutane", accutane);

  const { Attributes } = await dynamoDb
    .update(
      pauseAccutaneQuery(
        id,
        daysAmount,
        accutane.ttl,
        accutane.nextConfirmationDate as string
      )
    )
    .promise();

  logInfo("Accutane was successfully paused", Attributes);
  return Attributes as Accutane;
};
