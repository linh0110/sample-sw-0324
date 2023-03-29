import { Link } from "react-router-dom";
import { AccountAdmin } from "../contexts/AuthContext";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Center, VStack } from "@chakra-ui/react";
import InputForm from "../components/Form/InputForm";
import { guestValidation } from "../components/validate";

export const ForgetPassword = () => {
  const methods = useForm();

  const onSubmit = ({ account }) => {
    const message = account === AccountAdmin.account  ? `Your password is ${AccountAdmin.password}` : 'Account is not exist';
    methods.reset({ account: '' });
    methods.setError("account", {
      type: "manual",
      message,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <InputForm
            label="Username"
            name="account"
            validation={guestValidation.account}
          />

          <Button type="submit">Get password</Button>

          <Center>
            <Link to="/">Go to home</Link>
          </Center>
        </VStack>
      </form>
    </FormProvider>
  );
};

