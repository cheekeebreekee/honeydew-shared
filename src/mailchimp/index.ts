import Mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";
import { MAILCHIMP_CONFIG } from "../constants";
import { Patient } from "../types/Patient";
import { logInfo } from "../utils/logger";

Mailchimp.setConfig({
  apiKey: MAILCHIMP_CONFIG.API_KEY,
  server: MAILCHIMP_CONFIG.SERVER,
});

// Seems like Mailchimp doesn't have all types and namespaces
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mailchimpLists = Mailchimp.lists as any;

async function isMemberExist(patient: Patient) {
  logInfo("Checking patient existence in mailchimp");
  const subscriberHash = md5(patient.email.toLowerCase());

  try {
    await mailchimpLists.getListMember(
      MAILCHIMP_CONFIG.LIST_ID,
      subscriberHash
    );
    logInfo("Patient has been found");
    return true;
  } catch (e) {
    logInfo("Patient is not found in mailchimp");
    return false;
  }
}

async function createMember(patient: Patient) {
  logInfo("Creating patient in mailchimp");
  const splitPoint = patient.full_name.indexOf(" ");
  const subscriberHash = md5(patient.email.toLowerCase());

  await mailchimpLists.setListMember(MAILCHIMP_CONFIG.LIST_ID, subscriberHash, {
    status_if_new: "subscribed",
    email_address: patient.email,
    merge_fields: {
      FNAME: patient.full_name.slice(0, splitPoint),
      LNAME: patient.full_name.slice(splitPoint + 1, patient.full_name.length),
      PHONE: patient.phone || undefined,
    },
  });
  logInfo("Patient successfully created in mailchimp");
}

async function updateMemberStatus(
  patient: Patient,
  statusName: string,
  isActive: boolean
) {
  logInfo("Perform status update");
  const subscriberHash = md5(patient.email.toLowerCase());

  await mailchimpLists.updateListMemberTags(
    MAILCHIMP_CONFIG.LIST_ID,
    subscriberHash,
    {
      tags: [
        {
          name: statusName,
          status: isActive ? "active" : "inactive",
        },
      ],
    }
  );
  logInfo("Status of the patient has been updated in mailchimp");
}

async function setStatus(
  patient: Patient,
  statusName: string,
  isActive: boolean
) {
  logInfo("Setting status of the patient in mailcimp", {
    patient,
    statusName,
    isActive,
  });
  if (!(await isMemberExist(patient))) {
    logInfo(
      "Perform patient creation in mailchimp due to patient absence in system"
    );
    await createMember(patient);
  }

  await updateMemberStatus(patient, statusName, isActive);
}

export const MailchimpService = {
  setStatus,
};
