import { DynamoDB } from "aws-sdk";
import { Accutane } from "src/types/Accutane";
import { logInfo } from "../../../../utils/logger";
import markBloodWorkAsPopulatedQuery from "../../queries/mark-blood-work-as-populated";

const dynamoDb = new DynamoDB.DocumentClient();

export const markBloodWorkAsPopulated = async (accutaneId: string) => {
  logInfo("Marking blood work as populated", { accutaneId });

  const { Attributes } = await dynamoDb
    .update(markBloodWorkAsPopulatedQuery(accutaneId))
    .promise();

  logInfo("Blood work was successfully marked as populated", Attributes);
  return Attributes as Accutane;
};
