import { DynamoDB } from "aws-sdk";
import { Patient } from "src/types/Patient";
import { logInfo } from "../../../../utils/logger";
import setMeetingLinkQuery from "../../queries/set-meeting-link";

const dynamoDb = new DynamoDB.DocumentClient();

export const setMeetingLink = async (id: string, link: string | null) => {
  logInfo("Set meeting link in DB", { id, link });
  const { Attributes } = await dynamoDb.update(setMeetingLinkQuery(id, link)).promise();
  logInfo("Patient has been updated successfully");
  return Attributes as Patient;
};
