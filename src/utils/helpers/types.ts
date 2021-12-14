export interface PermissionsInterface {
  ROLE_CAN_ADD_ISSUER?: boolean;
  ROLE_SERVICE_MANAGER?: boolean;
  ROLE_CAN_SEE_ALL_ISSUERS?: boolean;
  ROLE_CAN_SEE_ISSUER_PAGE?: boolean;
}

export type UserType = "ISW_ADMIN" | "ISSUER";
export interface User {
  firstName: string;
  userName: string;
  lastName: string;
  email: string;
}

export type ErrorResponse = {
  error?: boolean;
  message?: string;
};

export interface RequestResponse<T = any> extends ErrorResponse {
  data: T | null;
}

export interface IssuerCreationData {
  organizationName: string;
  username: string;
  userRole: string;
  hostDomain: string;
  apiPath: string;
  basicAuthToken: string;
}

export interface IssuerUpdateData extends IssuerCreationData {
  id: number;
}
export interface IssuerCTSConfigData {
  issuerId: string;
  issuerName: string;
  bankCode: string;
  sendOtpOnBehalfOfIssuer: boolean;
  sendOtpEndpoint: string;
  idvOnExternalWalletsOnly: boolean;
  walletProviderId: string;
  encryptionSecret: string;
  maxVirtualCardProvisioning: number;
  otpMessageTemplate: string;
  sendOtpAdditionalRequestParam: string;
}

export interface TokenRequestorConfigData {
  issuerId: string;
  tokenRequestorId: string;
  cardScheme: string;
}

export interface Issuer extends IssuerCreationData {
  id: number;
  issuerId: string;
  secretKey: string;
}

export interface CertificateUploadData {
  configName: string;
  file: File | null;
  configType: string;
  ksPassword: string;
}
