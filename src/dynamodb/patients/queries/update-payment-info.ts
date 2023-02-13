import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { Membership, PaymentInfo } from "../../../types/Patient";
import { logInfo } from "../../../utils/logger";

export default (
  id: string,
  membership: Membership,
  paymentInfo: PaymentInfo
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #membership=:MEMBERSHIP, #paymentInfo=:PAYMENT_INFO",
    ExpressionAttributeNames: {
      "#membership": "membership",
      "#paymentInfo": "paymentInfo",
    },
    ExpressionAttributeValues: {
      ":MEMBERSHIP": membership,
      ":PAYMENT_INFO": paymentInfo,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
