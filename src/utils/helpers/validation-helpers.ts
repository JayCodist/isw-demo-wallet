export const alphaNumericValidation: (input: string) => string = input => {
  return input.replace(/[^a-z0-9-_\s@]/gi, "");
};

export const alphaNumericValidationWithDot: (input: string) => string =
  input => {
    return input.replace(/[^a-z0-9-_\s.@]/gi, "");
  };

export const isBase64: (input: string) => boolean = input => {
  if (!input || !input.trim()) {
    return false;
  }
  try {
    return btoa(atob(input)) === input;
  } catch (err) {
    return false;
  }
};

export const isValidDomain: (input: string) => boolean = input => {
  return /^(?:(?:(?:[a-zA-z-]+):\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?::[0-9]{1,5})?$/.test(
    input
  );
};
