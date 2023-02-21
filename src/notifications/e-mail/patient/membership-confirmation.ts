import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { SUBSCRIPTIONS_PRETTY } from "../../../shared";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES, Patient } from "../../../types";
import { logDebug } from "../../../utils";

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
  if (patient.basicInfo.parentsEmail) emails.push(patient.basicInfo.parentsEmail);

  const payload: HoneydewNotificationEvent = {
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
