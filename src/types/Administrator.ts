export interface Administrator {
  cognitoUserId: string;
  phone: string;
  fullName: string;
  email: string;
  group: string;
  groupFriendly: string;
}
export interface Employee {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}
