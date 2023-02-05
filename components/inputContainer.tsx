import React from 'react';

const InputContainer: React.FC<{
  children: JSX.Element | JSX.Element[];
  label: string;
}> = ({ children, label }) => {
  return (
    <div className="flex flex-col rounded-md border-2 border-blue-500 px-2 pb-2">
      <label htmlFor="" className="text-sm text-blue-500">
        {label}
      </label>
      {children}
    </div>
  );
};

export default InputContainer;
