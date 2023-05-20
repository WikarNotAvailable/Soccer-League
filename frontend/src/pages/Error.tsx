import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();

  return (
    <Flex
      h="60vh"
      w="90vw"
      justify="center"
      align="center"
      gap="8px"
      flexDir="column"
    >
      <Text fontSize="32px" fontWeight="600">
        Error!
      </Text>
      <Text fontSize="16px">Page not found:(</Text>
      <Button
        onClick={() => navigate("/")}
        bgColor="#ff3f3f"
        _hover={{ bgColor: "#ff3f3f", opacity: "0.7" }}
        mt="16px"
      >
        Go back home
      </Button>
    </Flex>
  );
};
