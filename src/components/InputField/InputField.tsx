import React from 'react';
import { TextField } from '@mui/material';
import './InputField.scss';

type Props = {
  label: string;
  value: string;
  isTouched: boolean;
  isValid: boolean;
  errorMessage?: string;
  helperText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

export const InputField: React.FC<Props> = ({
  label,
  value,
  isTouched,
  isValid,
  errorMessage,
  helperText,
  onChange,
  onBlur,
}) => {
  return (
    <TextField
      className="input-field"
      value={value}
      onBlur={onBlur}
      error={isTouched && !isValid}
      id="outlined-required"
      label={label}
      helperText={
        helperText ? helperText : isTouched && !isValid ? errorMessage : ''
      }
      onChange={onChange}
    />
  );
};
