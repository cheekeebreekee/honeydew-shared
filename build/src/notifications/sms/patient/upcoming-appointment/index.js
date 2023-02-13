"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upcomingAppointment = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const get_date_pretty_1 = require("../../../../utils/get-date-pretty");
const logger_1 = require("../../../../utils/logger");
const pinpoint = new aws_sdk_1.Pinpoint();
const upcomingAppointment = async (patients) => {
    (0, logger_1.logInfo)("Sending SMS notifications to patients about upcoming appointment", {
        patients,
    });
    if (!patients.length) {
        (0, logger_1.logWarn)("There is nobody to notify. Skip");
        return;
    }
    const params = {
        ApplicationId: "ffe1d2061f8b4784a8269ff690842c7c",
        MessageRequest: {
            Addresses: {},
            MessageConfiguration: {
                SMSMessage: {
                    Body: "Hey! You will have an appointment soon. \n\nPlease, reply to this message with 'yes' or 'y' if you confirm your participation. Otherwise, reply with 'no' or 'n' to reschedule your appointment",
                    MessageType: "PROMOTIONAL",
                    OriginationNumber: "+18337391508",
                    SenderId: "Honeydew",
                },
            },
        },
    };
    const addressesToSend = {};
    patients.forEach((patient) => {
        if (!patient.phone)
            return;
        addressesToSend[(0, trim_phone_number_1.trimPhoneNumber)(patient.phone)] = {
            ChannelType: "SMS",
            BodyOverride: `Hey! You have a virtual appointment at ${(0, get_date_pretty_1.getDatePretty)(patient.appointments[0].start_time)} with a licensed Honeydew dermatology provider. \n\nPlease reply to "Yes" or "Y" to this message to confirm your participation. Otherwise, reply with "No" or "N" to cancel or reschedule your appointment.`,
        };
    });
    params.MessageRequest.Addresses = addressesToSend;
    (0, logger_1.logInfo)("SMS message query", params);
    (0, logger_1.logInfo)("Count of patients to notify", { count: patients.length });
    await pinpoint.sendMessages(params).promise();
    (0, logger_1.logInfo)("Patients notified successfully");
};
exports.upcomingAppointment = upcomingAppointment;
//# sourceMappingURL=index.js.map