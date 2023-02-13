import { DynamoDB } from "aws-sdk";
import { Patient } from "src/types/Patient";
import { ShippingInfoPayload } from "../../../../types/Payload";
import { logInfo } from "../../../../utils/logger";
import updateShippingInfoQuery from "../../queries/update-shipping-info";

const dynamoDb = new DynamoDB.DocumentClient();

export const updateShippingInfo = async (
  id: string,
  shippingInfoPayload: ShippingInfoPayload
) => {
  logInfo("Updating patient's shipping info in DB", {
    id,
    shippingInfoPayload,
  });
  const { Attributes } = await dynamoDb
    .update(updateShippingInfoQuery(id, shippingInfoPayload))
    .promise();
  logInfo("Patient has been updated successfully");
  return Attributes as Patient;
};
