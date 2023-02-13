import { ADMINS_LIST } from "../../constants";
import { Patient } from "../../types/Patient";
import { logInfo } from "../../utils/logger";
import { DynamoDBService } from "../../dynamodb";
import { twilioClient } from "../shared";

export const createConversation = async (patient: Patient) => {
  logInfo("Creating new chat conversation", { patient });
  const conversation = await twilioClient.conversations.conversations.create({
    uniqueName: patient.id,
    friendlyName: patient.full_name,
  });

  logInfo("Chat coversation has been created successfully");
  logInfo("Attaching patient to the chat");
  await twilioClient.conversations
    .conversations(conversation.sid)
    .participants.create({
      identity: patient.email,
      attributes: JSON.stringify({
        userId: patient.id,
        userFullName: patient.full_name,
        identityType: "user",
        userPhone: patient.phone,
      }),
    });
  logInfo("Patient has been attached to the chat");

  const provider = await DynamoDBService.providers.get(patient.provider_id);
  const careCoordinator = await DynamoDBService.careCoordinators.get(
    patient.care_coordinator_id
  );

  logInfo("Attaching provider to the chat", provider);
  await twilioClient.conversations
    .conversations(conversation.sid)
    .participants.create({
      identity: provider.email,
      attributes: JSON.stringify({
        userId: patient.id,
        userFullName: patient.full_name,
        identityType: "provider",
        userPhone: patient.phone,
      }),
    });
  logInfo("Provider successfully attached to the chat");

  logInfo("Attaching care coordinator to the chat", careCoordinator);
  await twilioClient.conversations
    .conversations(conversation.sid)
    .participants.create({
      identity: careCoordinator.email,
      attributes: JSON.stringify({
        userId: patient.id,
        userFullName: patient.full_name,
        identityType: "care-coordinator",
        userPhone: patient.phone,
      }),
    });
  logInfo("Care coordinator successfully attached to the chat");

  logInfo("Attaching administrators to the chat", ADMINS_LIST);
  await Promise.all(
    ADMINS_LIST.map((admin) =>
      twilioClient.conversations
        .conversations(conversation.sid)
        .participants.create({
          identity: admin.email,
          attributes: JSON.stringify({
            userId: patient.id,
            userFullName: patient.full_name,
            identityType: "admin",
            userPhone: patient.phone,
          }),
        })
    )
  );
  logInfo("Administrators successfully attached to the chat");

  logInfo("Performing chat attributes update");
  await twilioClient.conversations.conversations(conversation.sid).update({
    attributes: JSON.stringify({
      conversationParticipantList: [
        {
          userId: patient.id,
          userFullName: patient.full_name,
          identity: patient.email,
          identityType: "user",
          identityTypeFriendly: "Patient",
        },
        {
          userId: provider.id,
          userFullName: `${provider.firstName} ${provider.lastName}`,
          identity: provider.email,
          identityType: "provider",
          identityTypeFriendly: "Provider",
        },
        {
          userId: careCoordinator.id,
          userFullName: `${careCoordinator.firstName} ${careCoordinator.lastName}`,
          identity: careCoordinator.email,
          identityType: "care-coordinator",
          identityTypeFriendly: "Care Coordinator",
        },
        ...ADMINS_LIST.map((admin) => ({
          userId: admin.cognitoUserId,
          userFullName: admin.fullName,
          identity: admin.email,
          identityType: "admin",
          identityTypeFriendly: "Administrator",
        })),
      ],
    }),
  });
  logInfo("Chat attributes successfully updated");
  logInfo("Chat has been set up successfully");
};
