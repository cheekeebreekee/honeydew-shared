export const collectInviteActions = (documentGroupInvite: any) =>
  documentGroupInvite.steps.reduce((acc: any, item: any) => [...acc, ...item.actions], []);
