import { DynamoDB } from "aws-sdk";
import { logInfo } from "../../../../utils/logger";
import addAccutaneDocumentCommentQuery from "../../queries/add-comment";

const dynamoDb = new DynamoDB.DocumentClient();

export const addComment = async (
  id: string,
  comment: string,
  patientId: string,
  signedBy: { id: string; name: string; role: string; createdAt: string }
) => {
  logInfo("Adding comment to accutane document record in DB", {
    id,
    comment,
    patientId,
    signedBy,
  });

  // const accutaneDocument = await DynamoDBService.accutaneDocuments.get(id);

  const updatedDocument = await dynamoDb
    .update(addAccutaneDocumentCommentQuery(id, comment, patientId, signedBy))
    .promise();

  logInfo("Comment was added successfully", updatedDocument);
};
