import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const InputForm = ({ name, label, validation, defaultValue, ...rest }) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  return (
    <FormControl isInvalid={errors[name]} isRequired={validation?.required}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input
        {...register(name, validation)}
        {...rest}
      />
      {errors[name] && (
        <FormErrorMessage>{errors[name].message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

InputForm.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validation: PropTypes.object,
};

InputForm.defaultProps = {
    label: "",
    validation: {},
    defaultValue: "",
}
export default InputForm;