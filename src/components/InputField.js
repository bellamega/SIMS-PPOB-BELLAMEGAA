import React from 'react';
import './InputField.css'; // Pastikan CSS sudah diimpor

const InputField = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="inputField">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
