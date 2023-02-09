export interface AccutaneTask {
  id: string;
  compositeKey: string;
  message: string;
  type: string;
  createdAt: string;
  assignedTo: {
    id: string;
    role: string;
  };
  document?: any;
}
