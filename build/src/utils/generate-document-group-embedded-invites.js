"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocumentGroupEmbeddedInvitesPayload = void 0;
const logger_1 = require("./logger");
const generateDocumentGroupEmbeddedInvitesPayload = (documentGroup, provider, patient) => {
    let patientInvite;
    if (patient.basicInfo.parentsEmail) {
        const splittedParentEmail = patient.basicInfo.parentsEmail.split("@");
        // Adding +1 at the end of email to prevent case if patient and parent email are similar because SignNow not allowing to have similar emails for multiple invitees
        const parentEmail = `${splittedParentEmail[0]}+1@${splittedParentEmail[1]}`;
        patientInvite = [
            {
                email: parentEmail,
                auth_method: "none",
                first_name: patient.full_name.split(" ")[0],
                last_name: "Parent/Guardian",
                documents: documentGroup.documents.map((document) => ({
                    id: document.id,
                    role: "Parent/Guardian",
                    action: "sign",
                })),
            },
            {
                email: patient.email,
                auth_method: "none",
                first_name: patient.full_name.split(" ")[0],
                last_name: patient.full_name.split(" ").pop(),
                documents: documentGroup.documents.map((document) => ({
                    id: document.id,
                    role: "Patient",
                    action: "sign",
                })),
            },
        ];
    }
    else {
        patientInvite = [
            {
                email: patient.email,
                auth_method: "none",
                first_name: patient.full_name.split(" ")[0],
                last_name: patient.full_name.split(" ").pop(),
                documents: documentGroup.documents.map((document) => ({
                    id: document.id,
                    role: "Patient",
                    action: "sign",
                })),
            },
        ];
    }
    const providerInvite = [
        {
            email: provider.email,
            auth_method: "none",
            first_name: provider.firstName,
            last_name: provider.lastName,
            documents: documentGroup.documents.map((document) => ({
                id: document.id,
                role: "Provider",
                action: "sign",
            })),
        },
    ];
    const invites = [
        {
            order: 1,
            signers: patientInvite,
        },
        {
            order: 2,
            signers: providerInvite,
        },
    ];
    (0, logger_1.logInfo)("Generated embedded invites", invites);
    return invites;
};
exports.generateDocumentGroupEmbeddedInvitesPayload = generateDocumentGroupEmbeddedInvitesPayload;
//# sourceMappingURL=generate-document-group-embedded-invites.js.map