import React from 'react';
import tw from 'tailwind.macro';

const Input = tw.input`
  appearance-none
  border border-solid border-gray-300
  focus:border-blue-500 hover:border-blue-500
  mx-auto my-3
  outline-none
  px-4 py-3 pt-5
  rounded-sm
  text-lg
  w-full
`;

const InputData = tw.input`
  appearance-none
  border border-solid border-gray-300
  focus:border-blue-500 hover:border-blue-500
  mx-auto mb-3
  outline-none
  px-3 py-2
  rounded-sm
  text-md
  w-full
`;

const Label = tw.label`
  absolute
  mb-0 -mt-2
  pt-4 pl-4
  leading-tighter
  text-gray-300 text-base
  mt-2
  cursor-text
`;

const Button = tw.button`
  border border-solid border-blue-500
  focus:border-blue-600 hover:border-blue-600
  bg-blue-500 focus:bg-blue-600 hover:bg-blue-600
  cursor-pointer
  mx-auto my-3
  outline-none
  px-4 py-3
  rounded-sm
  text-white text-lg
  w-full
`;

const ButtonData = tw.button`
  border border-solid border-blue-500
  focus:border-blue-600 hover:border-blue-600
  bg-blue-500 focus:bg-blue-600 hover:bg-blue-600
  cursor-pointer
  mx-auto mb-3
  outline-none
  px-3 py-2
  rounded-sm
  text-white text-lg
  w-full
`;

const Container = tw.div`
  bg-white
  max-w-xl
  mx-auto
  p-10
  rounded
  shadow
  text-lg
`;

const FormInputData = ({ name, type, defaultValue, placeholder, handleChange }) => {
  return (
    <InputData className="input" type={type || 'text'} name={name} placeholder={placeholder} defaultValue={defaultValue} onChange={handleChange} />
  );
};

const FormInput = ({ name, type, placeholder, handleChange }) => {
  return (
    <Input className="input" type={type || 'text'} name={name} placeholder={placeholder} onChange={handleChange} />
  );
};

const FormButton = ({ label, handleClick }) => {
  return (
    <Button type="submit" onClick={handleClick}>{label}</Button>
  );
};

const FormButtonData = ({ label, handleClick }) => {
  return (
    <ButtonData type="submit" onClick={handleClick}>{label}</ButtonData>
  );
};

const FormContainer = ({ children }) => {
  return (
    <Container>{children}</Container>
  );
};

const FormLabel = ({ htmlFor, children }) => {
  return (
    <Label htmlFor={htmlFor} className="label">{children}</Label>
  );
};

const Separator = tw.div`py-8`;

const Background = tw.div`
  bg-blue-100
  h-screen
  w-screen
`;

const FormInputGroup = tw.div`
  relative
`;

export {
  FormInput,
  FormButton,
  FormContainer,
  Separator,
  Background,
  FormLabel,
  FormInputGroup,
  FormInputData,
  FormButtonData
};

