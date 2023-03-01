import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { SUBSCRIPTIONS_PRETTY } from "../../../shared";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES, Patient } from "../../../types";
import { logDebug } from "../../../utils";

interface Props {
  patient: {
    email: string;
    parentsEmail?: string;
  };
  subscriptionType: string;
  amount: number;
  discount: number;
  isMultiaccount?: boolean;
}

export const membershipConfirmation = async ({
  patient,
  subscriptionType,
  amount,
  discount,
  isMultiaccount,
}: Props) => {
  logDebug("Sending email to patient about membership confirmation", {
    patient,
    subscriptionType,
    amount,
    discount,
    isMultiaccount,
  });

  const emails = [patient.email];
  if (patient.parentsEmail) emails.push(patient.parentsEmail);

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
