import AWS_EventBridge, { EventBridge } from "@aws-sdk/client-eventbridge";
import { DETAIL_TYPES } from "./detail-types";

const eventBridge = new EventBridge({});

export const publishEvent = async (data: string, detailType: DETAIL_TYPES) => {
  const params: AWS_EventBridge.PutEventsCommandInput = {
    Entries: [
      {
        Source: process.env.SERVICE,
        Detail: data,
        DetailType: detailType,
      },
    ],
  };

  await eventBridge.putEvents(params);
};
