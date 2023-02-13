import { DynamoDB } from "aws-sdk";
import { Accutane, BirthControl } from "src/types/Accutane";
import { Patient } from "src/types/Patient";
import { DynamoDBService } from "../../../index";
import { logError, logInfo } from "../../../../utils/logger";
import resetAccutaneTasksMaleQuery from "../../queries/reset-accutane-tasks-male";
import resetAccutaneTasksFemaleQuery from "../../queries/reset-accutane-tasks-female";

const dynamoDb = new DynamoDB.DocumentClient();

export const resetAccutaneTasks = async (patient: Patient) => {
  logInfo("Resetting accutane tasks for patient", { patient });

  const accutane = await DynamoDBService.accutane.getByPatientId(patient.id);

  if (!accutane?.id) {
    const message = "Accutane record not found in database";
    logError(message);
    throw new Error(message);
  }

  logInfo("Resetting accutane tasks for accutane record", accutane);

  const query =
    accutane.gender === "Female"
      ? resetAccutaneTasksFemaleQuery(accutane)
      : resetAccutaneTasksMaleQuery(accutane);

  const { Attributes } = await dynamoDb.update(query).promise();

  logInfo("Resetting accutane tasks was successfully done", Attributes);
  return Attributes as Accutane;
};
