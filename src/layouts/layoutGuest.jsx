import { Box, Heading, VStack } from "@chakra-ui/react";

const GuestLayout = ({ children }) => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={{ base: "4", md: "10" }}
    >
      <VStack spacing="8" w="full" maxW={{ base: "md", lg: "lg" }}>
        <Box textAlign="center">
          <Heading size="lg" fontWeight="extrabold">
            App Name
          </Heading>
        </Box>
        {children}
      </VStack>
    </Box>
  );
};

export default GuestLayout;