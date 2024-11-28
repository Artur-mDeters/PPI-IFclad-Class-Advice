/* eslint-disable react/prop-types */
// GradeTextField.js
import { TextField } from '@mui/material';

// eslint-disable-next-line no-unused-vars
const GradeTextField = ({ value, onChange, onBlur, fieldName, studentId, ...props }) => {
  const handleBlur = (e) => {
    let value = e.target.value;
    // Se o valor não contiver um ponto, adiciona ".0"
    if (value && !value.includes(".")) {
      value += ".0";
      onChange(value);
    } else {
      onBlur(e);
    }
  };

  return (
    <TextField
      value={value || ""}
      variant="standard"
      size="small"
      style={{ width: "80px" }}
      onChange={(e) => onChange(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        const invalidKeys = ["e", "E", "+", "-", ","]; // Bloqueia caracteres inválidos.
        if (invalidKeys.includes(e.key)) {
          e.preventDefault();
        }
      }}
      {...props}
    />
  );
};

export default GradeTextField;