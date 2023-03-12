import request, { gql } from "graphql-request/build/esm";
import { Patient } from "../types";

export const getPatient = async (patientId: string) => {
  const query = gql`
    query getPatient($patientId: String!)
  `;

  const result = await request<Patient>("", query, { patientId });
  return result;
};
