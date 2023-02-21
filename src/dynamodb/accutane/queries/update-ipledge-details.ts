import { DynamoDB } from "aws-sdk";
import { Accutane } from "src/types/Accutane";
import { Patient } from "src/types/Patient";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

const NEXT_CONFIRMATION_DATE_OFFSET = 30;

export default (
  id: string,
  { lastConfirmationDate, nextConfirmationDate, enrollmentDate, remsNumber }: Partial<Accutane>
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id,
    },
    UpdateExpression:
      "set #lastConfirmationDate=:LAST_CONFIRMATION_DATE, #nextConfirmationDate=:NEXT_CONFIRMATION_DATE, #remsNumber=:REMS_NUMBER, #enrollmentDate=:ENROLLMENT_DATE",
    ExpressionAttributeNames: {
      "#lastConfirmationDate": "lastConfirmationDate",
      "#nextConfirmationDate": "nextConfirmationDate",
      "#remsNumber": "remsNumber",
      "#enrollmentDate": "enrollmentDate",
      // "#ttl": "ttl",
    },
    ExpressionAttributeValues: {
      ":ENROLLMENT_DATE": enrollmentDate,
      ":REMS_NUMBER": remsNumber,
      ":LAST_CONFIRMATION_DATE": lastConfirmationDate,
      ":NEXT_CONFIRMATION_DATE": nextConfirmationDate,
      // ":TTL": new Date(nextConfirmationDate as string).getTime() / 1000,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
