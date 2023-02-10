import { useCallback, useState } from "react";

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(false);

  const onChange = ({ target }) => {
    const { value, name, validationMessage } = target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback((newValues) => {
    setValues({ ...initialValues, ...newValues });
    setErrors({});
    setValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { values, errors, isValid, onChange, resetForm };
}
