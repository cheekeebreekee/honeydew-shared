"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatientInitials = void 0;
function getPatientInitials(patient) {
    var _a, _b, _c, _d;
    const fullNameWords = patient.full_name.split(" ");
    const firstNameInitial = ((_b = (_a = fullNameWords.shift()) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || "";
    const lastNameInitial = ((_d = (_c = fullNameWords.pop()) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.toUpperCase()) || "";
    const initials = `${firstNameInitial ? `${firstNameInitial}.` : ""}${lastNameInitial ? `${lastNameInitial}.` : ""}`;
    return initials;
}
exports.getPatientInitials = getPatientInitials;
//# sourceMappingURL=get-patient-initials.js.map