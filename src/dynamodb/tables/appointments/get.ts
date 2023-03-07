import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  Appointment
} from "../../../types/Appointment";
import { logError, logInfo } from "../../../utils/logger";
import { config } from "../../../shared";

const dynamoDb = new DynamoDB({});

export const get = async (
  id: string
): Promise<Appointment> => {
  logInfo("Getting appointment from DB", { id });

  const query = {
    TableName: config.getSharedValue("appointmentsTableName"),
    Key: marshall({
      id,
    }),
  };

  logInfo("Getting appointment from DB query", query);

  const { Item } = await dynamoDb.getItem(query);

  if (!Item) {
    const message = `Appointment with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo("Appointment found", Item);

  return unmarshall(Item) as Appointment;
};
