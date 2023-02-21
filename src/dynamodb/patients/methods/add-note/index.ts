import { DynamoDB } from "aws-sdk";
import { Patient, PatientNote } from "../../../../types/Patient";
import updateNotesQuery from "../../queries/update-notes";
import getPatientQuery from "../../queries/get";
import { logInfo } from "../../../../utils/logger";

const dynamoDb = new DynamoDB.DocumentClient();

export const addNote = async (id: string, note: PatientNote) => {
  logInfo("Adding note to patient in DB", { id, note });
  const { Item: patient } = await dynamoDb.get(getPatientQuery(id)).promise();
  logInfo("Patient to add notes to", patient);

  const { notes } = patient as Patient;

  const updatedNotes = [...(notes || []), note];

  logInfo("Updated notes data", updatedNotes);

  const { Attributes } = await dynamoDb.update(updateNotesQuery(id, updatedNotes)).promise();

  logInfo("New note has been added to patient in DB");
  return Attributes as Patient;
};
