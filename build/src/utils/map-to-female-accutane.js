"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToFemaleAccutaneModel = void 0;
const mapToFemaleAccutaneModel = (id, patient, subscription, timestamp) => ({
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
        populated: false,
        updatedAt: "",
        confirmed: false,
    },
    birthControl: {
        createdAt: "",
        updatedAt: "",
        primaryForm: "",
        secondaryForm: "",
        completed: false,
    },
    pregnancyTest: {
        createdAt: "",
        updatedAt: "",
        eSignature: "",
        photos: [],
        completed: false,
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
exports.mapToFemaleAccutaneModel = mapToFemaleAccutaneModel;
//# sourceMappingURL=map-to-female-accutane.js.map