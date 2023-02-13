"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToMaleRenewAccutaneModel = void 0;
const NEXT_CONFIRMATION_DATE_OFFSET = 30;
const mapToMaleRenewAccutaneModel = (data, timestamp) => {
    var _a, _b, _c, _d, _e;
    return ({
        id: data.id,
        patientId: data.patientId,
        gender: data.gender,
        enrollmentDateOffset: data.enrollmentDateOffset,
        lastConfirmationDate: data.lastConfirmationDate,
        nextConfirmationDate: data.nextConfirmationDate,
        enrollmentDate: data.enrollmentDate,
        paymentDetails: {
            id: data.paymentDetails.id,
            customerId: data.paymentDetails.customerId,
            createdAt: data.paymentDetails.createdAt,
        },
        bloodWork: {
            createdAt: (_a = data.bloodWork) === null || _a === void 0 ? void 0 : _a.createdAt,
            completed: (_b = data.bloodWork) === null || _b === void 0 ? void 0 : _b.completed,
            populated: (_c = data.bloodWork) === null || _c === void 0 ? void 0 : _c.populated,
            updatedAt: (_d = data.bloodWork) === null || _d === void 0 ? void 0 : _d.updatedAt,
            confirmed: (_e = data.bloodWork) === null || _e === void 0 ? void 0 : _e.confirmed,
        },
        iPledgeConsent: {
            createdAt: data.iPledgeConsent.createdAt,
            updatedAt: data.iPledgeConsent.updatedAt,
            signed: data.iPledgeConsent.signed,
            confirmed: data.iPledgeConsent.confirmed,
        },
        remsNumber: data.remsNumber,
        ttl: Math.round(new Date(timestamp.setDate(timestamp.getDate() + 30)).getTime() / 1000),
        isOnboarding: false,
    });
};
exports.mapToMaleRenewAccutaneModel = mapToMaleRenewAccutaneModel;
//# sourceMappingURL=map-to-male-renew-accutane.js.map