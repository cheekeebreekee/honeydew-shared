import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { ShippingInfoPayload } from "../../../types/Payload";
import { logInfo } from "../../../utils/logger";

export default (
  id: string,
  { addressLine1, addressLine2, city, firstName, lastName, state, zipCode }: ShippingInfoPayload
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #shippingInfo=:SHIPPING_INFO",
    ExpressionAttributeNames: {
      "#shippingInfo": "shippingInfo",
    },
    ExpressionAttributeValues: {
      ":SHIPPING_INFO": {
        addressLine1,
        addressLine2,
        city,
        firstName,
        lastName,
        state,
        zipCode,
      },
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
