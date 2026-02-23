import React from "react";
import "../styles/components.css";

const FormInput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  label,
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={label}>{label}</label>}
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="form-input"
      />
    </div>
  );
};

export default FormInput;
