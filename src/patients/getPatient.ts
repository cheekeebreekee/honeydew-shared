import { gql, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import fetch from "cross-fetch";
import { Patient } from "../types";
import { logError } from "../utils";

export const getPatient = async (patientId: string) => {
  // TODO: generalize initalization
  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: "// TODO",
      fetch,
    }),
    cache: new InMemoryCache(),
  });

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
