import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (
  id: string,
  status: boolean
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression:
      "set #medicalBackground.#notifiedAboutFillingBeforeAppointment=:NOTIFIED",
    ExpressionAttributeNames: {
      "#medicalBackground": "medicalBackground",
      "#notifiedAboutFillingBeforeAppointment":
        "notifiedAboutFillingBeforeAppointment",
    },
    ExpressionAttributeValues: {
      ":NOTIFIED": status,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
