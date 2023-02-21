import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (accutaneId: string): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id: accutaneId,
    },
    UpdateExpression: "SET #iPledgeConsent.#inviteId=:INVITE_ID",
    ExpressionAttributeNames: {
      "#iPledgeConsent": "iPledgeConsent",
      "#inviteId": "inviteId",
    },
    ExpressionAttributeValues: {
      ":INVITE_ID": null,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
