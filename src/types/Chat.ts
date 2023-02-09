export interface ChatParticipantAttributes {
  userId: string;
  userFullName: string;
  identity: string;
  identityType: string;
  identityTypeFriendly: string;
}

export interface Attachment {
  type: string;
  data: string | any;
}
