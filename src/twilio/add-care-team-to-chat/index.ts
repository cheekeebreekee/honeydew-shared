import { Patient } from "src/types/Patient";
import { ConversationAttributes } from "src/types/Twilio";
import { DynamoDBService } from "../../dynamodb";
import { TwilioService } from "..";
import { logInfo, logWarn } from "../../utils/logger";

export const addCareTeamToChat = async (
  conversationUniqueName: string,
  patient: Patient
) => {
  logInfo("Adding care team to chat", {
    patient,
    conversationUniqueName,
  });
  const conversation = await TwilioService.getConversation(
    conversationUniqueName
  );
  if (!conversation) {
    logWarn("An attempt to add care team to non-existing chat appeared");
    return;
  }

  const participants = await conversation.participants().list();

  if (patient.provider_id) {
    const provider = await DynamoDBService.providers.get(patient.provider_id);
    if (
      !participants.find(
        (participant) => participant.identity === provider.email
      )
    ) {
      logInfo("Adding provider to chat");
      await conversation.participants().create({
        identity: provider.email,
        attributes: JSON.stringify({
          userId: patient.id,
          userFullName: patient.full_name,
          identityType: "provider",
          userPhone: patient.phone,
        }),
      });
      await conversation.update({
        attributes: JSON.stringify({
          conversationParticipantList: [
            ...(JSON.parse(conversation.attributes) as ConversationAttributes)
              .conversationParticipantList,
            {
              userId: provider.id,
              userFullName: `${provider.firstName} ${provider.lastName}`,
              identity: provider.email,
              identityType: "provider",
              identityTypeFriendly: "Provider",
            },
          ],
        }),
      });
    } else {
      logInfo("This provider is already in the chat");
    }
  }
  if (patient.care_coordinator_id) {
    const careCoordinator = await DynamoDBService.careCoordinators.get(
      patient.care_coordinator_id
    );
    if (
      !participants.find(
        (participant) => participant.identity === careCoordinator.email
      )
    ) {
      logInfo("Adding care coordinator to chat");
      await conversation.participants().create({
        identity: careCoordinator.email,
        attributes: JSON.stringify({
          userId: patient.id,
          userFullName: patient.full_name,
          identityType: "care-coordinator",
          userPhone: patient.phone,
        }),
      });
      await conversation.update({
        attributes: JSON.stringify({
          conversationParticipantList: [
            ...(JSON.parse(conversation.attributes) as ConversationAttributes)
              .conversationParticipantList,
            {
              userId: careCoordinator.id,
              userFullName: `${careCoordinator.firstName} ${careCoordinator.lastName}`,
              identity: careCoordinator.email,
              identityType: "care-coordinator",
              identityTypeFriendly: "Care Coordinator",
            },
          ],
        }),
      });
    } else {
      logInfo("This care coordinator is already in the chat");
    }
  }
};
