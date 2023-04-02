import React, { useMemo, useState, useCallback } from "react";
import dateFormat from "dateformat";
import {
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  IconButton,
  Tooltip,
  Spinner,
  Input,
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import styled from "@emotion/styled";
import Card from "components/card/Card";
import Deck from "./deck";
import Orb from "./orb";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import useClients from "hooks/useClients";
import { extendTheme, withDefaultVariant } from '@chakra-ui/react'

const customTheme = extendTheme(
  withDefaultVariant({
    variant: '#003F5E',
    components: ['Table', 'Tr', 'Td', 'tr', 'td'],
  }),
)
const Loader = styled.button`
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const convertTickToMilli = (tick) => {
  const echoTick = 621355968000000000;
  const ms = Math.floor((tick - echoTick) / 10000);
  return ms;
};
const calWin = (values) => {
  var win = 0;
  if (values.m_nWinGameCount)
      win = values.m_nWinGameCount;
  
  return win;
}
const calLose = ( values ) => {
  var lose = 0;
  if (values.m_nLoseGameCount)
      lose = values.m_nLoseGameCount;
  return lose;
}
export default function ClientTable(props) {
  const {
    loading,
    clients,
    pageIndex,
    nextPage,
    prevPage,
    gotoFirst,
    gotoLast,
    setSearchName,
    updateSorting,
    setRefresh
  } = useClients();
  const [search, setSearch] = useState("");

  const columns = useMemo(
    () => [
      {
        name: "Acount",
        accessor: "m_strClientName",
        renderRow: (row) => (
          <>
            <Text fontSize="16px" textAlign="center">
              {row.values.m_strClientName}
            </Text>
            {/* <Text fontSize="13px" textAlign="center">
              {row.values.m_strClientEmail}
            </Text> */}
          </>
        ),
      },
      {
        name: "ClientEmail",
        accessor: "m_strClientEmail",
        hidden: true,
      },
      {
        name: "lose",
        accessor: "m_nLoseGameCount",
        hidden: true,
      },
      {
        name: "Score",
        accessor: "m_nAdmitFragments",
        renderRow: (row) => <>0</>,
      },
      {
        name: "Win / Lose",
        accessor: "m_nWinGameCount",
        renderRow: (row) => (
          <>
            <Text fontSize="16px" textAlign="center">
              {calWin(row.values) + calLose(row.values)}
            </Text>
            <Text fontSize="12px" textAlign="center">
              { calWin(row.values) + "/" + calLose(row.values) }
            </Text>
          </>
        ),
      },
      {
        name: "Orb",
        accessor: "m_nOrb",
        renderRow: ({ values }) => <Orb />,
      },
      {
        name: "Repairs",
        accessor: "m_nTotalRepairs",
        renderRow: ({ values }) => <>{values.m_nTotalRepairs}</>,
      },
      {
        name: "Deck",
        accessor: "m_lstDeckInfo",
        renderRow: ({ values }) => <Deck deckInfo={values.m_lstDeckInfo} />,
      },
      {
        name: "Last SignIn Time",
        accessor: "lastPlayGameTime",
        renderRow: ({ values }) => (
          <>
            {dateFormat(
              new Date(convertTickToMilli(values.lastPlayGameTime)),
              "fullDate"
            )}
          </>
        ),
      },
    ],
    []
  );

  const data = clients;
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageCount,
    gotoPage,
    previousPage,
  } = tableInstance;
  //console.log("headerGroups", headerGroups);
  //console.log("page", page);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const handleKeyDown = useCallback((e) => {
    if (e.keyCode === 13) {
      setSearchName(search)
    }
  }, [search, setSearchName]);

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          All Clients
          <Button
              justify="center"
              disabled={loading}
              mb={2}
              onClick={() =>{ setRefresh();setSearch("")}}
            >
              <RepeatIcon w={6} h={6} />
            </Button>
        </Text>
        <Flex>
          <Input
            type="text"
            value={search}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Input User Name"
            border="1px"
            borderColor="gray.200"
            mr="2"
            disabled={loading}
          />
          <Button
            justify="center"
            disabled={loading}
            onClick={() => setSearchName(search)}
          >
            Search
          </Button>
        </Flex>
      </Flex>
      <div style={{ position: "relative", minHeight: "320px" }}>
        <Table
          {...getTableProps()}
          variant="striped" 
          colorScheme= "facebook"
          color="gray.500"
          mb="24px"
          minHeight="320px"
        >
          <Thead>
            {headerGroups.map((headerGroup, headerIndex) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={headerIndex}>
                {headerGroup.headers
                  .filter((i) => !i.hidden)
                  .map((header, index) => (
                    <Th
                      key={index}
                      userSelect="none"
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                      borderColor={borderColor}
                    >
                      <Flex
                        alignItems="center"
                        justify="center"
                        align="center"
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color="gray.400"
                        onClick={() => updateSorting(header.id)}
                      >
                        {header.name}
                        {!!header.isSorted &&
                          (header.isSortedDesc ? (
                            <ChevronDownIcon ml={1} w={4} h={4} />
                          ) : (
                            <ChevronUpIcon ml={1} w={4} h={4} />
                          ))}
                      </Flex>
                    </Th>
                  ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()} verticalAlign="top">
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells
                    .filter((i) => !i.column.hidden)
                    .map((cell, index) => (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        borderColor="transparent"
                        p={1}
                        align="center"
                      >
                        <div style={{ textAlign: "center" }} align="center">
                          {cell.column.renderRow(cell.row)}
                        </div>
                      </Td>
                    ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        {loading && (
          <Loader>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Loader>
        )}
      </div>
      <Flex justifyContent="center" m={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => gotoFirst(0)}
              isDisabled={pageIndex <= 0}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={()=>prevPage()}
              isDisabled={pageIndex <= 0}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
        <Flex alignItems="center">
          <Text flexShrink="0" m={4}>
            Page{" "}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{" "}
            {/* of{" "}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text> */}
          </Text>
        </Flex>
        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={() => nextPage()}
              isDisabled={pageIndex >= pageCount}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => gotoLast(pageCount - 1)}
              isDisabled={pageIndex >= pageCount}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Card>
  );
}
