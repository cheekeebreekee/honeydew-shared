"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectInviteActions = void 0;
const collectInviteActions = (documentGroupInvite) => documentGroupInvite.steps.reduce((acc, item) => [...acc, ...item.actions], []);
exports.collectInviteActions = collectInviteActions;
//# sourceMappingURL=collect-invite-actions.js.map