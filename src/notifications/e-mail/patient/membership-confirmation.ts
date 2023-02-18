import { publishEvent } from "src/events";
import { DETAIL_TYPES } from "src/events/detail-types";
import { SUBSCRIPTIONS_PRETTY } from "src/shared";
import { NotificationEvent, NOTIFICATION_TYPES, Patient } from "src/types";
import { logDebug } from "src/utils";

export const membershipConfirmation = async (
  patient: Patient,
  subscriptionType: string,
  amount: number,
  discount: number,
  isMultiaccount?: boolean
) => {
  logDebug("Sending email to patient about membership confirmation", {
    patient,
    subscriptionType,
    amount,
    discount,
  });

  const emails = [patient.email];
  if (patient.basicInfo.parentsEmail)
    emails.push(patient.basicInfo.parentsEmail);

  const payload: NotificationEvent = {
    type: NOTIFICATION_TYPES.EMAIL,
    targetAddresses: emails,
    template: "membership-confirmation",
    data: {
      emailSubject: "Welcome to your Honeydew membership!",
      subscriptionType: SUBSCRIPTIONS_PRETTY[subscriptionType],
      discount,
      isMultiaccount,
      total: amount / 100,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Email message sent successfully");
};
