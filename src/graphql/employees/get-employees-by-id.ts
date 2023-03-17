import { gql } from "@apollo/client/core";
import { config } from "../../shared";
import { Employee } from "../../types";
import { logError } from "../../utils";
import { getApolloNodeClient } from "../../utils/get-apollo-node-client";

export const getEmployeesById = async (employeeIds: string[]) => {
  const apolloClient = getApolloNodeClient(config.getSharedValue("employeeServiceGraphQLEndpoint"));

  const result = await apolloClient.query<Employee[]>({
    query: gql`
      query getEmployeesById($employeeIds: [String])
    `,
    variables: {
      employeeIds,
    },
  });

  if (result.error) {
    logError("Error during employees get by account operation", result.errors);
    throw new Error("Error during employees get by account operation");
  }
  return result.data;
};
