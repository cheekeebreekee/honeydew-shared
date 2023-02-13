"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToFemaleRenewAccutaneModel = void 0;
const NEXT_CONFIRMATION_DATE_OFFSET = 30;
const mapToFemaleRenewAccutaneModel = (data, timestamp) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
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
        birthControl: {
            createdAt: (_f = data.birthControl) === null || _f === void 0 ? void 0 : _f.createdAt,
            updatedAt: (_g = data.birthControl) === null || _g === void 0 ? void 0 : _g.updatedAt,
            primaryForm: (_h = data.birthControl) === null || _h === void 0 ? void 0 : _h.primaryForm,
            secondaryForm: (_j = data.birthControl) === null || _j === void 0 ? void 0 : _j.secondaryForm,
            completed: (_k = data.birthControl) === null || _k === void 0 ? void 0 : _k.completed,
        },
        pregnancyTest: {
            createdAt: (_l = data.pregnancyTest) === null || _l === void 0 ? void 0 : _l.createdAt,
            updatedAt: (_m = data.pregnancyTest) === null || _m === void 0 ? void 0 : _m.updatedAt,
            eSignature: (_o = data.pregnancyTest) === null || _o === void 0 ? void 0 : _o.eSignature,
            photos: (_p = data.pregnancyTest) === null || _p === void 0 ? void 0 : _p.photos,
            completed: (_q = data.pregnancyTest) === null || _q === void 0 ? void 0 : _q.completed,
        },
        iPledgeConsent: {
            createdAt: data.iPledgeConsent.createdAt,
            updatedAt: data.iPledgeConsent.updatedAt,
            // confirm if we need to reset iPledge each month or just on the first time and then just confirm it
            signed: data.iPledgeConsent.signed,
            confirmed: data.iPledgeConsent.confirmed,
        },
        remsNumber: data.remsNumber,
        ttl: Math.round(new Date(timestamp.setDate(timestamp.getDate() + 30)).getTime() / 1000),
        isOnboarding: false,
    });
};
exports.mapToFemaleRenewAccutaneModel = mapToFemaleRenewAccutaneModel;
//# sourceMappingURL=map-to-female-renew-accutane.js.map