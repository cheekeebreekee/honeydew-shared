import { DynamoDB } from "aws-sdk";
import { Accutane, IPledgeConsent } from "src/types/Accutane";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (
  id: string,
  { createdAt }: Partial<IPledgeConsent>,
  {
    enrollmentDate,
    enrollmentDateOffset,
    lastConfirmationDate,
    nextConfirmationDate,
  }: Partial<Accutane>
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id,
    },
    UpdateExpression:
      "set #iPledgeConsent.#createdAt=:CREATED_AT, #enrollmentDate=:ENROLLMENT_DATE, #enrollmentDateOffset=:ENROLLMENT_OFFSET, #lastConfirmationDate=:LAST_CONFIRMATION_DATE, #nextConfirmationDate=:NEXT_CONFIRMATION_DATE",
    ExpressionAttributeNames: {
      "#iPledgeConsent": "iPledgeConsent",
      "#createdAt": "createdAt",
      "#enrollmentDate": "enrollmentDate",
      "#enrollmentDateOffset": "enrollmentDateOffset",
      "#lastConfirmationDate": "lastConfirmationDate",
      "#nextConfirmationDate": "nextConfirmationDate",
    },
    ExpressionAttributeValues: {
      ":CREATED_AT": createdAt,
      ":ENROLLMENT_DATE": enrollmentDate,
      ":ENROLLMENT_OFFSET": enrollmentDateOffset,
      ":LAST_CONFIRMATION_DATE": lastConfirmationDate,
      ":NEXT_CONFIRMATION_DATE": nextConfirmationDate,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
