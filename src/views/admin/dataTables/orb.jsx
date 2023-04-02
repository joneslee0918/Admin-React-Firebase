import React from "react";
import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";

const CircleIcon = styled.div(({ color }) => ({
  width: "8px",
  height: "8px",
  borderRadius: "12px",
  backgroundColor: color,
  marginTop: "6px",
  marginRight: "8px",
}));

const Orb = () => {
  return (
    <Flex justify="center">
      <Flex direction="column" mr={4}>
        <Flex>
          <CircleIcon color="red" />
          <span>{0}</span>
        </Flex>
        <Flex>
          <CircleIcon color="#FF7F27" />
          <span>{1}</span>
        </Flex>
        <Flex>
          <CircleIcon color="#0080C0" />
          <span>{2}</span>
        </Flex>
      </Flex>
      <Flex direction="column">
        <Flex>
          <CircleIcon color="blue" />
          <span>{0}</span>
        </Flex>
        <Flex>
          <CircleIcon color="green" />
          <span>{0}</span>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Orb;