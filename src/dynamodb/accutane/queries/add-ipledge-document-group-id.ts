import { DynamoDB } from "aws-sdk";
import { Accutane } from "src/types/Accutane";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (
  accutaneId: string,
  documentGroupId: string
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id: accutaneId,
    },
    UpdateExpression: "SET #iPledgeConsent.#documentGroupId=:DOCUMENT_GROUP_ID",
    ExpressionAttributeNames: {
      "#iPledgeConsent": "iPledgeConsent",
      "#documentGroupId": "documentGroupId",
    },
    ExpressionAttributeValues: {
      ":DOCUMENT_GROUP_ID": documentGroupId,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
