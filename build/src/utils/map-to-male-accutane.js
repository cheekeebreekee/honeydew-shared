"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToMaleAccutaneModel = void 0;
const mapToMaleAccutaneModel = (id, patient, subscription, timestamp) => ({
    id,
    patientId: patient.id,
    gender: patient.basicInfo.gender,
    paymentDetails: {
        id: subscription.id,
        customerId: patient.paymentInfo.customerId,
        createdAt: new Date(subscription.created).toISOString(),
    },
    bloodWork: {
        createdAt: "",
        completed: false,
        confirmed: false,
        populated: false,
        updatedAt: "",
    },
    iPledgeConsent: {
        createdAt: timestamp.toISOString(),
        updatedAt: timestamp.toISOString(),
        signed: false,
        confirmed: false,
    },
    remsNumber: "",
    ttl: Math.round(new Date(timestamp.setDate(timestamp.getDate() + 30)).getTime() / 1000),
    isOnboarding: true,
});
exports.mapToMaleAccutaneModel = mapToMaleAccutaneModel;
//# sourceMappingURL=map-to-male-accutane.js.map