import { gql } from "@apollo/client/core";
import { config } from "../../shared";
import { Patient } from "../../types";
import { logError } from "../../utils";
import { getApolloNodeClient } from "../../utils/get-apollo-node-client";

export const getPatientsByAccountId = async (accountId: string) => {
  const apolloClient = getApolloNodeClient(config.getSharedValue("patientsServiceGraphQLEndpoint"));

  const result = await apolloClient.query<Patient[]>({
    query: gql`
      query getPatientsByAccountId($accountId: String!)
    `,
    variables: {
      accountId,
    },
  });

  if (result.error) {
    logError("Error during patients get by account operation", result.errors);
    throw new Error("Error during patients get by account operation");
  }
  return result.data;
};
