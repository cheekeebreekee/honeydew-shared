export interface DocumentGroupEmbeddedInviteSigner {
  email: string;
  first_name: string;
  last_name: string;
  auth_method: string;
  documents: any[];
}

export interface DocumentGroupEmbeddedInvite {
  order: number;
  signers: DocumentGroupEmbeddedInviteSigner[];
}

export interface DocumentEmbeddedInvite {
  email: string;
  role_id: string;
  order: number;
  auth_method: string;
}

export interface EmbeddedInvite {
  id: string;
  email: string;
  role_id: string;
  order: number;
  status: string;
}

export interface SignNowRole {
  unique_id: string;
  signing_order: string;
  name: string;
}
