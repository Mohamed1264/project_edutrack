import { useCallback, useState } from 'react';

const useForm = (initialValues, validationRules = {}, typeForm) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
   console.log(values);
  // Handle input changes: supports both event or (name, value)
  const handleChange = (eOrName, maybeValue) => {
    if (eOrName && eOrName.target) {
      // called with event: handleChange(event)
      const { name, value } = eOrName.target;
      setValues(prev => ({ ...prev, [name]: value }));
    } else if (typeof eOrName === 'string') {
      // called with name and value: handleChange(name, value)
      setValues(prev => ({ ...prev, [eOrName]: maybeValue }));
    } else {
      // invalid call, do nothing or warn
      console.warn('handleChange: invalid arguments', eOrName, maybeValue);
    }
  };

  const handleFocus = (name) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '', // clear error on focus
    }));
  };

  const isSubmitDisabled = useCallback(() => {
    if (typeForm === 'add') {
      return Object.values(values).some(value => value === '');
    }
    if (typeForm === 'edit') {
      return !Object.keys(values).some(key => values[key] !== initialValues[key]);
    }
    return false;
  }, [values, initialValues, typeForm]);

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    Object.keys(values).forEach(key => {
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

export default useForm;
