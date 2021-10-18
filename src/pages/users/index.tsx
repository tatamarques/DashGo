 import { useState } from "react";
 import { Box, 
         Flex, 
         Heading, 
         Button, 
         Icon, 
         Table,
         Thead,
         Tr,
         Th,
         Checkbox,
         Tbody,
         Td, 
         Text,
         useBreakpointValue,
         Spinner} from "@chakra-ui/react";
import { RiAddLine, RiPencilFill } from "react-icons/ri";
import Link from 'next/link';
import { useQuery } from 'react-query'

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";


export default function UserList(){
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page)

  const isWebVersion = useBreakpointValue({
    base: false,
    lg: true
  });
  
  
  return(
    <Box>
      <Header/>

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar/>

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal"> 
              Users 

              {! isLoading && isFetching && <Spinner size="sm" 
                color="gray.50" ml="4"/>}
            </Heading>

            <Link href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20"/>}>

                Create user
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex>
              <Spinner/>
            </Flex>
          ): error ? (
            <Flex justify="center">
              <Text> Error loading users</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8" >
                      <Checkbox colorScheme="pink"/>
                    </Th>
                    <Th>User</Th>
                    {isWebVersion && <Th>Creation Date</Th>}
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(user => {
                    return (
                      <>
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink"/>
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        {isWebVersion && <Td>{user.createAt}</Td>}
                        <Td>
                        <Button 
                          as="a" 
                          size="sm" 
                          fontSize="sm" 
                          colorScheme="purple"
                          leftIcon={<Icon as={RiPencilFill} fontSize="16"/>}>
                          Update  
                        </Button>
                        </Td>
                      </Tr>
                      </>
                    )
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )
          }
        </Box>
      </Flex>
    </Box>
  )
}