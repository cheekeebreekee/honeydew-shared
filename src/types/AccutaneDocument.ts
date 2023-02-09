export interface AccutaneDocument {
  id: string;
  compositeKey: string;
  title: string;
  uploadedBy: {
    id: string;
    name: string;
  };
  signedBy?:
    | {
        id: string;
        name: string;
        role: string;
        createdAt: string;
      }
    | unknown;
  assignedTo?:
    | {
        id: string;
        name: string;
        role: string;
      }
    | unknown;
  taskName?: string | null;
  createdAt: string;
  comment: string;
  type: string;
  url: string;
}
