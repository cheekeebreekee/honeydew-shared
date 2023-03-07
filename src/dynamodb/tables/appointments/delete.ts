import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { logInfo } from "../../../utils/logger";
import { config } from "../../../shared";

const dynamoDb = new DynamoDB({});

export const remove = async (id: string) => {
  logInfo("Delete appointment from DB", { id });

  const query = {
    TableName: config.getSharedValue("appointmentsTableName"),
    Key: marshall({
      id,
    }),
  };

  logInfo("Delete appointment from DB query", query);

  await dynamoDb.deleteItem(query);

  logInfo("Appointment has been deleted successfully");
};
