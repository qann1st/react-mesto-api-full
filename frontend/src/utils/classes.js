export const inputClass = (error, elementClass) =>
  "input " + (elementClass || "") + (error ? " input_error" : "");

export const inputErrorClass = (error) => "error" + (error ? " error_active" : "");
