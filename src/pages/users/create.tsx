import { Box, 
         Flex,
         Heading,
         Divider,
         VStack,
         SimpleGrid,
         HStack,
         Button } from "@chakra-ui/react";

import Link from 'next/link';         

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { SubmitHandler, useForm} from 'react-hook-form'

type CreateUserFormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  surname: yup.string().required('Surname is required'),
  email: yup.string().required('Email is required').email("Email invalid"),
  password: yup.string().required('Password is required'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'Password does not match'),
})



export default function CreateUser(){
  const { register, 
         handleSubmit, 
        formState: {errors, isSubmitting}} = useForm<CreateUserFormData>({
        resolver: yupResolver(createFormSchema)
});

const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  console.log(values);
}

return(
<Box>
  <Header/>

<Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
  <Sidebar/>

  <Box  as="form"
        flex="1" 
        borderRadius={8} 
        bg="gray.800" 
        p={["6", "8"]}
        onSubmit={handleSubmit(handleCreateUser)}
    >
    <Heading size="lg" fontWeight="normal">Create user</Heading> 

    <Divider my="6" borderColor="gray.700"/>  

    <VStack spacing="8">
      <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
        <Input 
          name="name" 
          label="First Name" 
          error={errors.name}
          {...register('name')}/>
        <Input 
         name="surname" 
         label="Surname"
         error={errors.surname}
          {...register('surname')}/>
        <Input 
          name="email" 
          type="email" 
          label="Email"
          error={errors.email}
          {...register('email')}/>
      </SimpleGrid>

      <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
        <Input 
          name="password" 
          type="password" 
          label="Password"
          error={errors.password}
          {...register('password')}/>
        <Input 
         name="password_confirmation" 
         type="password" 
         label="Password confirmation"
         error={errors.password_confirmation}
          {...register('password_confirmation')}/>
      </SimpleGrid>
    </VStack>
    <Flex mt="8" justify="flex-end">
      <HStack spacing="4">
        <Link href="/users" passHref>
          <Button colorSheme="whiteAlpha"> Cancel </Button>
        </Link>
        <Button 
         type="submit"
         colorScheme="pink"
         isLoading={isSubmitting}> Save</Button>
      </HStack>
    </Flex>
 </Box>
</Flex>
</Box>
)
}