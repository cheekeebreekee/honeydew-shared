export interface CognitoUserAttributesCustom {
  sub?: string;
  email_verified?: string;
  "custom:fullName"?: string;
  email?: string;
  "custom:userId"?: string;
}

export interface CognitoUserCustom extends CognitoUserAttributesCustom {
  username: string;
  group: string;
}
