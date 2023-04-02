import React from "react";
import { Box } from "@chakra-ui/react";
import ClientTable from "./clientTable";

export default function Settings() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ClientTable />
    </Box>
  );
}
