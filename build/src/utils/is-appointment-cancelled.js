"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAppointmentCancelled = void 0;
function isAppointmentCancelled(patient) {
    const lastAppointmentStatus = patient.appointmentStatus
        ? patient.appointmentStatus[0].status
        : "";
    return lastAppointmentStatus === "cancelled";
}
exports.isAppointmentCancelled = isAppointmentCancelled;
//# sourceMappingURL=is-appointment-cancelled.js.map