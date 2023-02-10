import { useCallback, useState } from "react";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
    setError(e.target.validationMessage);
  };

  const resetInput = useCallback(() => {
    setValue(initialValue);
    setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, error, onChange, resetInput];
};
