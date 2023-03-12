import { DynamoDB, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { config, DynamoDBService } from "../../..";
import { Appointment } from "../../../types/Appointment";
import { logError, logInfo } from "../../../utils/logger";

const dynamoDb = new DynamoDB({});

export const setAppointmentStatus = async (patientId: string, status: string) => {
  logInfo("Updating appointment status in DB", { patientId, status });

  if (!patientId) {
    const message = "No patient ID found in partial";
    logError(message);
    throw new Error(message);
  }

  const appointment = await DynamoDBService.appointments.get(patientId);

  logInfo("Appointment to update", appointment);

  const query: UpdateItemCommandInput = {
    TableName: config.getSharedValue("appointmentsTableName"),
    Key: marshall({
      id: patientId,
    }),
    UpdateExpression: "set #status=:STATUS",
    ExpressionAttributeNames: {
      "#history": "history",
    },
    ExpressionAttributeValues: marshall({
      ":STATUS": status,
    }),
    ReturnValues: "ALL_NEW",
  };

  logInfo("Update appointment status query", query);

  const { Attributes } = await dynamoDb.updateItem(query);

  return unmarshall(Attributes as any) as Appointment;
};
