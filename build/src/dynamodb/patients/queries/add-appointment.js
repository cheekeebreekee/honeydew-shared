"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (patient, payload, providerId) => {
    var _a;
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        Key: {
            id: patient.id,
        },
        UpdateExpression: "set #providerId=:PROVIDER_ID, #appointments=:APPOINTMENTS, #calendlyInviteeID=:CALENDLY_INVITEE_ID, #appointmentStatus=:APPOINTMENT_STATUS, #notifiedAboutUpcomingAppointment=:NOTIFIED_ABOUT_UPCOMING_APPOINTMENT",
        ExpressionAttributeNames: {
            "#appointments": "appointments",
            "#calendlyInviteeID": "calendly_invitee_id",
            "#appointmentStatus": "appointmentStatus",
            "#notifiedAboutUpcomingAppointment": "notifiedAboutUpcomingAppointment",
            "#providerId": "provider_id",
        },
        ExpressionAttributeValues: {
            ":CALENDLY_INVITEE_ID": payload.invitee.uuid,
            ":PROVIDER_ID": providerId,
            ":APPOINTMENTS": [
                {
                    id: payload.event.uuid,
                    start_time: payload.event.start_time.trim(),
                    start_time_pretty: payload.event.start_time_pretty,
                    invitee_start_time: payload.event.invitee_start_time.trim(),
                    invitee_start_time_pretty: payload.event.invitee_start_time_pretty,
                    end_time: payload.event.end_time.trim(),
                    end_time_pretty: payload.event.end_time_pretty,
                    invitee_end_time: payload.event.invitee_end_time.trim(),
                    invitee_end_time_pretty: payload.event.invitee_end_time_pretty,
                    created_at: payload.event.created_at.trim(),
                    cancelled: false,
                    canceller_name: null,
                    cancel_reason: null,
                    cancelled_at: null,
                    type: {
                        id: payload.event_type.uuid,
                        kind: payload.event_type.kind,
                        name: payload.event_type.name,
                        duration: payload.event_type.duration,
                        owner: payload.event_type.owner,
                    },
                    assigned_to: payload.event.extended_assigned_to,
                },
                ...patient.appointments,
            ],
            ":APPOINTMENT_STATUS": [
                {
                    status: "rescheduled",
                    reason: ((_a = payload.old_invitee) === null || _a === void 0 ? void 0 : _a.cancel_reason) || null,
                    timestamp: Date.now(),
                },
                ...(patient.appointmentStatus || []),
            ],
            ":NOTIFIED_ABOUT_UPCOMING_APPOINTMENT": false,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=add-appointment.js.map