import { DynamoDB, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { config, DynamoDBService } from "../../..";
import {
  Appointment,
  AppointmentHistory
} from "../../../types/Appointment";
import { logError, logInfo } from "../../../utils/logger";

const dynamoDb = new DynamoDB({});

export const addHistoryRecord = async (
  patientId: string,
  historyRecord: AppointmentHistory
) => {
  logInfo("Updating appointment history in DB", { patientId, historyRecord });

  if (!patientId) {
    const message = "No patient ID found in partial";
    logError(message);
    throw new Error(message);
  }

  const appointment = await DynamoDBService.appointments.get(patientId);

  logInfo("Appointment to update", appointment);

  const updatedHistory: AppointmentHistory[] = [
    ...appointment.history,
    historyRecord,
  ];

  logInfo("Updated history data", updatedHistory);

  const query: UpdateItemCommandInput = {
    TableName: config.getSharedValue("appointmentsTableName"),
    Key: marshall({
      id: patientId,
    }),
    UpdateExpression:
      "set #history=:HISTORY",
    ExpressionAttributeNames: {
      "#history": "history",
    },
    ExpressionAttributeValues: marshall({
      ":HISTORY": updatedHistory,
    }),
    ReturnValues: "ALL_NEW",
  };

  logInfo("Update appointment history query", query);

  const { Attributes } = await dynamoDb.updateItem(query);

  return unmarshall(Attributes as any) as Appointment;
};
