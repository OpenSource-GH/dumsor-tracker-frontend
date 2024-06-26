function normalizeSupabaseError(error: string): string {
  if (typeof error !== "string") {
    return "There was an error";
  }

  const errorMap: { [key: string]: string } = {
    "AuthApiError: Invalid login credentials": "Invalid Credentials",
    "AuthApiError: Unsupported phone provider": "Unsupported Phone Provider",
    "AuthApiError: Token has expired or is invalid":
      "Token has expired or is invalid",
    "AuthApiError: Error sending confirmation sms":
      "There was an error sending the OTP.",
    // Add more error mappings here as needed
  };

  for (const key in errorMap) {
    if (error.includes(key)) {
      return errorMap[key];
    }
  }

  return "There was an error";
}

export { normalizeSupabaseError };
