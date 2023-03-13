import { gql } from "@apollo/client/core";
import { logError } from "../utils";
import { getApolloNodeClient } from "../utils/get-apollo-node-client";

export const getPatientsCountByAccountId = async (accountId: string) => {
  const apolloClient = getApolloNodeClient("// TODO");

  const result = await apolloClient.query<number>({
    query: gql`
      query getPatientCount($accountId: String!)
    `,
    variables: {
      accountId,
    },
  });

  if (result.error) {
    logError("Error during patient get count operation", result.errors);
    throw new Error("Error during patient get count operation");
  }
  return result.data;
};
