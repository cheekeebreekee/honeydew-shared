import { accounts } from "./tables/accounts";
import { employees } from "./tables/employees";
import { patients } from "./tables/patients";

export const DynamoDBService = {
  employees,
  accounts,
  patients,
};
