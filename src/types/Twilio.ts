export interface ConversationParticipantAttributes {
  userId: string;
  userFullName: string;
  identity: string;
  identityType: string;
  identityTypeFriendly: string;
}

export interface ConversationAttributes {
  conversationParticipantList: ConversationParticipantAttributes[];
}
