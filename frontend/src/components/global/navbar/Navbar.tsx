import { Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Flex
      w="100vw"
      p="16px 40px"
      position="fixed"
      top="0"
      zIndex="100"
      align="center"
      gap="16px"
      bgColor="#f0f0f0"
    >
      <Link to="/">Clubs</Link>
      <Link to="/players">Players</Link>
      <Link to="/matches">Matches</Link>
      <Link to="/goals">Goals</Link>
    </Flex>
  );
};
