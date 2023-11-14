import React from 'react';

type InputProps = {
  type: "text"  | "email" | "password";
  id: string;
  placeholder: string;
  name?: "email" | "password" | "name";
  setInputData: React.Dispatch<React.SetStateAction<string | undefined>>;
  className: string;
  value: string |undefined;
};

const Input: React.FC<InputProps> = ({
  type,
  id,
  placeholder,
  name,
  setInputData,
  className,
  value,
}: InputProps) => {
  return (
    <>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        className={className}
        onChange={(e) => setInputData(e.target.value)}
        value={value || ""}
      />
    </>
  );
};

export default Input;
