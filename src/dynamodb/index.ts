import * as patients from "./patients";
import * as providers from "./providers";
import * as careCoordinators from "./care-coordinators";
import * as medicine from "./medicine";
import * as treatmentPlans from "./treatment-plans";
import * as unsupportedPatients from "./unsupported-patients";
import * as enrollmentCoordinators from "./enrollment-coordinators";
import * as accutane from "./accutane";
import * as accutaneNotifications from "./accutane-notifications";
import * as accutaneDocuments from "./accutane-documents";
import * as accutaneTasks from "./accutane-tasks";
import * as admins from "./admins";

export const DynamoDBService = {
  patients,
  providers,
  careCoordinators,
  medicine,
  treatmentPlans,
  unsupportedPatients,
  enrollmentCoordinators,
  accutane,
  accutaneNotifications,
  accutaneDocuments,
  accutaneTasks,
  admins,
};
