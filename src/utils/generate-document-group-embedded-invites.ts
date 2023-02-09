import { Patient } from "src/types/Patient";
import { Provider } from "src/types/Provider";
import { DocumentGroupEmbeddedInvite } from "src/types/SignNow";
import { logInfo } from "./logger";

export const generateDocumentGroupEmbeddedInvitesPayload = (
  documentGroup: any,
  provider: Provider,
  patient: Patient
): DocumentGroupEmbeddedInvite[] => {
  let patientInvite;

  if (patient.basicInfo.parentsEmail) {
    const splittedParentEmail = patient.basicInfo.parentsEmail.split("@");
    // Adding +1 at the end of email to prevent case if patient and parent email are similar because SignNow not allowing to have similar emails for multiple invitees
    const parentEmail = `${splittedParentEmail[0]}+1@${splittedParentEmail[1]}`;
    patientInvite = [
      {
        email: parentEmail,
        auth_method: "none",
        first_name: patient.full_name.split(" ")[0] as string,
        last_name: "Parent/Guardian",
        documents: documentGroup.documents.map((document: any) => ({
          id: document.id,
          role: "Parent/Guardian",
          action: "sign",
        })),
      },
      {
        email: patient.email,
        auth_method: "none",
        first_name: patient.full_name.split(" ")[0] as string,
        last_name: patient.full_name.split(" ").pop() as string,
        documents: documentGroup.documents.map((document: any) => ({
          id: document.id,
          role: "Patient",
          action: "sign",
        })),
      },
    ];
  } else {
    patientInvite = [
      {
        email: patient.email,
        auth_method: "none",
        first_name: patient.full_name.split(" ")[0] as string,
        last_name: patient.full_name.split(" ").pop() as string,
        documents: documentGroup.documents.map((document: any) => ({
          id: document.id,
          role: "Patient",
          action: "sign",
        })),
      },
    ];
  }

  const providerInvite = [
    {
      email: provider.email,
      auth_method: "none",
      first_name: provider.firstName,
      last_name: provider.lastName,
      documents: documentGroup.documents.map((document: any) => ({
        id: document.id,
        role: "Provider",
        action: "sign",
      })),
    },
  ];
  const invites = [
    {
      order: 1,
      signers: patientInvite,
    },
    {
      order: 2,
      signers: providerInvite,
    },
  ];

  logInfo("Generated embedded invites", invites);

  return invites;
};
