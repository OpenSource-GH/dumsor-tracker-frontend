export type EmailCredentialsPayload = {
  email: string;
  password: string;
};

export type PhoneCredentialsPayload = {
  phone: string;
};

export type VerifyPhoneCredentialsPayload = {
  phone: string;
  pin: string;
};
