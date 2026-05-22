import * as Yup from "yup";
const passwordRules =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]).*$/;

export const SignUpValidation = Yup.object().shape({
  email: Yup.string()
    .email("please enter a valid email!")
    .required("Email is required!"),
  password: Yup.string()
    .matches(
      passwordRules,
      "Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    .min(7, "password must be at least 7 characters.")
    .required("password is required!!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null as any], "Passwords must match")
    .required("Confirm password is required"),
});

export const ForgotPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email("please enter a valid email!")
    .required("Email is required!"),
});

export const ResetPasswordValidation = Yup.object().shape({
  newpassword: Yup.string()
    .matches(
      passwordRules,
      "Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    .min(6, "password must be at least 6 characters.")
    .required("password is required!!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newpassword"), null as any], "Passwords must match")
    .required("Required"),
});
