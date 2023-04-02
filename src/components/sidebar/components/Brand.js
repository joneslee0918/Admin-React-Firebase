import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <div style={{paddingBottom: '10px'}} pb ='10px' h='26px' w='175px' my='32px'>
          <img src="https://thenemots.com/wp-content/uploads/2023/02/logo.png" />
      </div>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
