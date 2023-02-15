import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { Medicine } from "../../../types/Medicine";
import { logInfo } from "../../../utils/logger";

export default (
  id: string,
  {
    name,
    size,
    strength,
    instructions,
    specialInstructions,
    refillCount,
    refillExpiration,
  }: Medicine
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.MEDICINE_TABLE,
    Key: {
      id,
    },
    UpdateExpression:
      "set #name=:NAME, #size=:SIZE, #strength=:STRENGTH, #instructions=:INSTRUCTIONS, #specialInstructions=:SPECIAL_INSTRUCTIONS, #refillCount=:REFILL_COUNT, #refillExpiration=:REFILL_EXPIRATION",
    ExpressionAttributeNames: {
      "#name": "name",
      "#size": "size",
      "#strength": "strength",
      "#instructions": "instructions",
      "#specialInstructions": "specialInstructions",
      "#refillCount": "refillCount",
      "#refillExpiration": "refillExpiration",
    },
    ExpressionAttributeValues: {
      ":NAME": name,
      ":SIZE": size,
      ":STRENGTH": strength,
      ":INSTRUCTIONS": instructions,
      ":SPECIAL_INSTRUCTIONS": specialInstructions,
      ":REFILL_COUNT": refillCount,
      ":REFILL_EXPIRATION": refillExpiration,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
