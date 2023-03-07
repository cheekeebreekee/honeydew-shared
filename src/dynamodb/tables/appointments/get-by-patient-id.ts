import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { logError, logInfo } from "../../../utils/logger";
import { config } from "../../../shared";
import { Appointment } from "../../../types";

const dynamoDb = new DynamoDB({});

export const getByPatientId = async (
  patientId: string
): Promise<Appointment> => {
  logInfo("Getting appointment from DB by patient ID", { patientId });

  const query = {
    TableName: config.getSharedValue("appointmentsTableName"),
    ExpressionAttributeNames: {
      "#patientId": "patientId",
    },
    ExpressionAttributeValues: marshall({
      ":ID": patientId,
    }),
    IndexName: "patientIdIndex",
    ReturnValues: "ALL_NEW",
  };

  logInfo("Getting appointment from DB query", query);

  const { Items } = await dynamoDb.query(query);

  if (!Items?.length) {
    const message = `Appointment with patient ID ${patientId} was not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo("Appointment found", Items);

  return unmarshall(Items[0]) as Appointment;
};
