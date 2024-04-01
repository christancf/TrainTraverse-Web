import {
  emailPattern,
  namePattern,
  nicPattern,
  passwordPattern,
  phoneNumberPattern,
} from "./regexPatterns";

//update traveller data when input changes
export const handleChange = (event, setData) => {
  setData((prev) => ({
    ...prev,
    [event.target.name]: event.target.value,
  }));
};

//handle the status change
export const handleToggleChange = (isActive, setData) => {
  setData((prev) => ({
    ...prev,
    isActive,
  }));
};

export const handleInput = (errorData, setErrorData) => {
  // clear errors in fields while typing
  Object.keys(errorData).forEach((field) =>
    setErrorData((prev) => ({ ...prev, [field]: "" }))
  );
};

export const getFieldColor = (field) => {
  return field ? "failure" : "primary";
};

//handle form validations
export const handleValidation = (hasValidationErrorRef, data, setErrorData) => {
  hasValidationErrorRef.current = false;
  // checks for empty fields and format errors
  Object.keys(data).forEach((field) => {
    if (data[field] === "") {
      setErrorData((prev) => ({
        ...prev,
        [field]: `${camelCaseToWords(field)} is required`,
      }));
      hasValidationErrorRef.current = true;
    } else {
      switch (field) {
        case "firstName":
        case "lastName":
          if (!data[field].match(namePattern)) {
            setErrorData((prev) => ({
              ...prev,
              [field]: "please enter a valid name",
            }));
            hasValidationErrorRef.current = true;
          }
          break;
        case "nic":
        case "travellerNic":
          if (!data[field].match(nicPattern)) {
            setErrorData((prev) => ({
              ...prev,
              [field]: "please enter a valid NIC",
            }));
            hasValidationErrorRef.current = true;
          }
          break;
        case "email":
          if (!data[field].match(emailPattern)) {
            setErrorData((prev) => ({
              ...prev,
              [field]: "please enter a valid email",
            }));
            hasValidationErrorRef.current = true;
          }
          break;
        case "password":
          if (!data[field].match(passwordPattern)) {
            setErrorData((prev) => ({
              ...prev,
              [field]:
                "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
            }));
            hasValidationErrorRef.current = true;
          }
          break;
        case "contactNumber":
          if (!data[field].match(phoneNumberPattern)) {
            setErrorData((prev) => ({
              ...prev,
              [field]: "please enter a valid phone number",
            }));
            hasValidationErrorRef.current = true;
          }
          break;
        default:
          return;
      }
    }
  });
};

const camelCaseToWords = (text) => {
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
