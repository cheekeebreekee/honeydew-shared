import { CareCoordinator } from "src/types/CareCoordinator";
import { Patient } from "src/types/Patient";
import { Provider } from "src/types/Provider";
import { ConversationAttributes } from "src/types/Twilio";
import { TwilioService } from "..";
import { logError, logInfo } from "../../utils/logger";

const employeesTypes = {
  provider: {
    code: "provider",
    label: "Provider",
  },
  "care-coordinator": {
    code: "care-coordinator",
    label: "Care Coordinator",
  },
};

export const addParticipant = async (
  patient: Patient,
  employeeType: "provider" | "care-coordinator",
  employee: Provider | CareCoordinator
) => {
  logInfo("Adding a participant to chat", {
    patient,
    employee,
  });
  const conversation = await TwilioService.getConversation(patient.id);
  if (!conversation) {
    logError("An attempt to add care team to non-existing chat appeared");
    return;
  }
  const { label, code } = employeesTypes[employeeType];

  const participants = await conversation.participants().list();

  if (participants.some(({ identity }) => identity === employee.email)) {
    logInfo("This employee already exists in chat");
    return;
  }

  await conversation.participants().create({
    identity: employee.email,
    attributes: JSON.stringify({
      userId: patient.id,
      userFullName: patient.full_name,
      identityType: code,
      userPhone: patient.phone,
    }),
  });
  const attributes = JSON.parse(
    conversation.attributes
  ) as ConversationAttributes;
  attributes.conversationParticipantList =
    attributes.conversationParticipantList.filter(
      ({ userId }) => userId !== employee.id
    );

  await conversation.update({
    attributes: JSON.stringify({
      conversationParticipantList: [
        ...attributes.conversationParticipantList,
        {
          userId: employee.id,
          userFullName: `${employee.firstName} ${employee.lastName}`,
          identity: employee.email,
          identityType: code,
          identityTypeFriendly: label,
        },
      ],
    }),
  });
};
