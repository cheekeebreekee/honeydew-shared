import { DynamoDB } from "aws-sdk";
import { Accutane } from "src/types/Accutane";
import { Patient } from "src/types/Patient";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

const NEXT_CONFIRMATION_DATE_OFFSET = 30;

const getExpressionAttributeNames = (gender: string) =>
  gender === "Female"
    ? {
        "#iPledgeConsent": "iPledgeConsent",
        "#confirmed": "confirmed",
        "#completed": "completed",
        "#updatedAt": "updatedAt",
        "#birthControl": "birthControl",
        "#pregnancyTest": "pregnancyTest",
        "#bloodWork": "bloodWork",
        "#nextConfirmationDate": "nextConfirmationDate",
        "#lastConfirmationDate": "lastConfirmationDate",
      }
    : {
        "#iPledgeConsent": "iPledgeConsent",
        "#confirmed": "confirmed",
        "#completed": "completed",
        "#updatedAt": "updatedAt",
        "#bloodWork": "bloodWork",
        "#nextConfirmationDate": "nextConfirmationDate",
        "#lastConfirmationDate": "lastConfirmationDate",
      };

const getUpdateExpression = (gender: string) =>
  gender === "Female"
    ? "set #iPledgeConsent.#updatedAt=:UPDATED_AT, #iPledgeConsent.#confirmed=:CONFIRMED, #nextConfirmationDate=:NEXT_CONFIRMATION_DATE, #lastConfirmationDate=:LAST_CONFIRMATION_DATE, #birthControl.#completed=:COMPLETED, #pregnancyTest.#completed=:COMPLETED, #bloodWork.#completed=:COMPLETED, #bloodWork.#confirmed=:CONFIRMED"
    : "set #iPledgeConsent.#updatedAt=:UPDATED_AT, #iPledgeConsent.#confirmed=:CONFIRMED, #nextConfirmationDate=:NEXT_CONFIRMATION_DATE, #lastConfirmationDate=:LAST_CONFIRMATION_DATE, #bloodWork.#completed=:COMPLETED, #bloodWork.#confirmed=:CONFIRMED";

export default (
  patient: Patient,
  accutane: Accutane,
  confirmed: boolean
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id: accutane.id,
    },
    UpdateExpression:
      "set #iPledgeConsent.#updatedAt=:UPDATED_AT, #iPledgeConsent.#confirmed=:CONFIRMED, #nextConfirmationDate=:NEXT_CONFIRMATION_DATE, #lastConfirmationDate=:LAST_CONFIRMATION_DATE, #bloodWork.#completed=:COMPLETED, #bloodWork.#confirmed=:CONFIRMED",
    ExpressionAttributeNames: {
      "#iPledgeConsent": "iPledgeConsent",
      "#confirmed": "confirmed",
      "#completed": "completed",
      "#updatedAt": "updatedAt",
      "#bloodWork": "bloodWork",
      "#nextConfirmationDate": "nextConfirmationDate",
      "#lastConfirmationDate": "lastConfirmationDate",
    },
    ExpressionAttributeValues: {
      ":UPDATED_AT": new Date().toISOString(),
      ":CONFIRMED": confirmed,
      ":COMPLETED": true, // If CC or Admin confirms IPledge, all outstanding tasks related to the previous next confirmation date should be resolved (i.e. “get blood work”, “confirm forms of pregnancy prevention”, etc.). They should only reappear 5 days before the next confirmation date. Those tasks are to get to a confirmation, so once the patient is confirmed, those tasks are irrelevant and the clock resets
      ":NEXT_CONFIRMATION_DATE": new Date(
        new Date().getTime() +
          NEXT_CONFIRMATION_DATE_OFFSET * 24 * 60 * 60 * 1000
      ).toISOString(),
      ":LAST_CONFIRMATION_DATE": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
