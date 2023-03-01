export interface Account {
  id: string;
  customerId: string;
  conversationId: string;
  email: string;
  patients: string[];
  parentsInfo: {
    email: string;
    phone: string;
  };
}
