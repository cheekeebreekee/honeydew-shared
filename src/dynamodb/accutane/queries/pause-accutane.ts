import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (
  id: string,
  daysAmount: number,
  currentTtl: number,
  nextConfirmationDate: string
): DynamoDB.DocumentClient.UpdateItemInput => {
  logInfo("Current TTL value", { currentTtl });

  const shiftedTtl = currentTtl + daysAmount * 24 * 60 * 60;
  const shiftedNextConfirmationDate =
    new Date(nextConfirmationDate).getTime() + daysAmount * 24 * 60 * 60 * 1000;

  logInfo("Shifted TTL value", { shiftedTtl });

  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #ttl=:TTL, #nextConfirmationDate=:NEXT_CONFIRMATION_DATE",
    ExpressionAttributeNames: {
      "#ttl": "ttl",
      "#nextConfirmationDate": "nextConfirmationDate",
    },
    ExpressionAttributeValues: {
      ":TTL": shiftedTtl,
      ":NEXT_CONFIRMATION_DATE": new Date(shiftedNextConfirmationDate).toISOString(),
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
