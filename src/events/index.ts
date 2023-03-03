import AWS_EventBridge, { EventBridge } from "@aws-sdk/client-eventbridge";
import { DETAIL_TYPES } from "./detail-types";

const eventBridge = new EventBridge({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET as string,
  },
  region: process.env.AWS_REGION,
});

export const publishEvent = async (data: string, detailType: DETAIL_TYPES) => {
  const params: AWS_EventBridge.PutEventsCommandInput = {
    Entries: [
      {
        Source: process.env.AWS_LAMBDA_FUNCTION_NAME,
        Detail: data,
        DetailType: detailType,
      },
    ],
  };

  await eventBridge.putEvents(params);
};
