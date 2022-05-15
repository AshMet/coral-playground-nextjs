import React, { useMemo } from "react";

// Chakra imports
import {
  Button,
  Flex,
  Link,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

// React Table
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { FaEthereum } from "react-icons/fa";

function TopCreatorTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  const textColor = useColorModeValue("navy.700", "white");
  const textColorLink = useColorModeValue("blue.500", "white");

  return (
    <>
      <Flex
        direction='column'
        w='100%'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex
          align='center'
          justify='space-between'
          w='100%'
          px='22px'
          pb='8px'
          boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.12)'>
          <Text color={textColor} fontSize='xl' fontWeight='700'>
            Latest Offers
          </Text>
          <Button variant='action'>See all</Button>
        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor='transparent'>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='gray.400'>
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "Price") {
                      data = (
                        <Flex align='center'>
                          <Icon
                            color={textColor}
                            as={FaEthereum}
                            w='16px'
                            h='16px'
                            me='4px'
                          />
                          <Text
                            color={textColor}
                            fontSize='md'
                            fontWeight='700'>
                            {cell.value[0]} ETH
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "USD Price") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='500'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Expiration") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='500'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "From") {
                      data = (
                        <Link w='max-content'>
                          <Text
                            color={textColorLink}
                            fontSize='sm'
                            fontWeight='500'
                            w='max-content'>
                            {cell.value}
                          </Text>
                        </Link>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        pb='10px'
                        minW={{
                          sm: "150px",
                          md: "200px",
                          lg: "auto",
                          xl: "50px",
                        }}
                        maxW='100px'
                        borderColor='transparent'>
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default TopCreatorTable;
