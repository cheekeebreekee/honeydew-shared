import { gql } from "@apollo/client/core";
import { Patient } from "../types";
import { logError } from "../utils";
import { getApolloNodeClient } from "../utils/get-apollo-node-client";

export const getPatient = async (patientId: string) => {
  const apolloClient = getApolloNodeClient("// TODO");

  const result = await apolloClient.query<Patient>({
    query: gql`
      query getPatient($patientId: String!)
    `,
    variables: {
      patientId,
    },
  });

  if (result.error) {
    logError("Error during patient get operation", result.errors);
    throw new Error("Error during patient get operation");
  }
  return result.data;
};
