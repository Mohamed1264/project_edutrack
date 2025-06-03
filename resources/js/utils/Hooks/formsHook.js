
import { useCallback, useState } from 'react';

const formsHook = (initialValues, validationRules = {}, typeForm) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFocus = (name) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const isSubmitDisabled = useCallback(() => {
    if (typeForm === 'add') {
      return Object.keys(values).some((key) => values[key] === '');
    }

    if (typeForm === 'edit') {
      return !Object.keys(values).some((key) => values[key] !== initialValues[key]);
    }
  }, [values, initialValues, typeForm]);

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    if (validate()) {
      callback();
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    Object.keys(values).forEach((key) => {
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
        const isCheckTargetValid = !tempErrors[check];

        if (isCheckTargetValid && values[key] !== values[check]) {
          tempErrors[key] = message || `${key} does not match ${check}`;
          isValid = false;
        }
      }
    });

    setErrors(tempErrors);
    return isValid;
  };

  return {
    values,
    errors,
    handleChange,
    handleFocus,
    handleSubmit,
    isSubmitDisabled,
    resetForm,
  };
};

export { formsHook };
