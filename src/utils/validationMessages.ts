import type { FieldError } from "react-hook-form";

type FieldName = "email" | "password" | "confirmPassword" | "otp";
export type ErrorType =
  | "required"
  | "pattern"
  | "minLength"
  | "specialCharacters"
  | "uppercase"
  | "number";

export const getErrorMessages = (
  fieldName: FieldName,
  errors: FieldError | undefined
) => {
  if (!errors) {
    return "";
  }

  switch (errors.type) {
    case "required":
      return `${fieldName} is required`;
    case "pattern":
      return `Invalid ${fieldName}`;
    case "minLength":
      return `${fieldName} must be at least 7 characters`;
    case "specialCharacters":
      return `${fieldName} must contain at least one special character`;
    case "uppercase":
      return `${fieldName} must contain at least one uppercase letter`;
    case "number":
      return `${fieldName} must contain at least one number`;
    default:
      return "";
  }
};
