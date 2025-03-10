import { useState } from 'react';

const useForm = (initialValues, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFocus = (name) => {
   
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear error for the focused field
    }));
  };

  // Handle form submission
  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    if (validate()) {
      callback(); 
      setValues(initialValues); // Execute the callback function (e.g., API call)
    }
  };

  // Validation using regex
  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    Object.keys(values).forEach((key) => {
      // Check for empty fields
      if (!values[key]) {
        tempErrors[key] = `${key} is required`;
        isValid = false;
      }

      // Check regex rules if defined
      if (validationRules[key]?.regex && values[key]) {
        const { regex, message } = validationRules[key];
        if (!regex.test(values[key])) {
          tempErrors[key] = message || `${key} is invalid`;
          isValid = false;
        }
      }

      if (validationRules[key]?.validateFunc) {
        const { validateFunc, message } = validationRules[key];
        if (!validateFunc(values[key])) {
          tempErrors[key] = message || `${key} is invalid`;
          isValid = false;
        }
      }
      if (validationRules[key]?.check) {
        const { check, message } = validationRules[key];
        if (values[key] !== values[check]) {
          tempErrors[key] = message || `${key} is invalid`;
          isValid = false;
        }
      }
    });

    setErrors(tempErrors);
    return isValid;
  };
  const isFormInvalid = Object.values(values).some((value) => String(value).trim === '');

  return {
    values,
    errors,
    handleChange,
    handleFocus,
    handleSubmit,
    isFormInvalid
  };
};

export default useForm;