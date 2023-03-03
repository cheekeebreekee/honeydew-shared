import { accounts } from "./tables/accounts";
import { employees } from "./tables/employees";
import { patients } from "./tables/patients";
import { pinpointSMSMessageRecords } from "./tables/pinpointSMSMessages";

export const DynamoDBService = {
  employees,
  accounts,
  patients,
  pinpointSMSMessageRecords,
};
