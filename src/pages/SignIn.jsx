import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Center, VStack } from "@chakra-ui/react";
import InputForm from "../components/Form/InputForm";
import { guestValidation } from "../components/validate";

export const SignInForm = () => {
  const { signIn } = useContext(AuthContext);
  const methods = useForm();

  const onSubmit = (data) => {
    signIn(data);
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

          <InputForm
            label="Password"
            name="password"
            type="password"
            validation={guestValidation.password}
          />

          <Button type="submit">Sign In</Button>

          <Center>
            <Link to="/forget-password">Forget password</Link>
          </Center>
        </VStack>
      </form>
    </FormProvider>
  );
};