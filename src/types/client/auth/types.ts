// User Info Response

export interface TUserInfoResponse {
  data: {
    message: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    address: string;
    approximateAddress: string;
    fixPhoneNumber: string;
    education: string;
    birthdate: string;
  };
}
