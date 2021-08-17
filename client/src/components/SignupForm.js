// import react dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';

// import chakra dependencies
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputLeftElement,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { AtSignIcon } from '@chakra-ui/icons'

// import apollo dependency
import { useMutation } from '@apollo/client';

// import utils dependencies
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  // handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formData.email,
        password: formData.password,
        username: formData.username
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  }

  // handle changes to input field
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign Up</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleFormSubmit}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as ={BiUserCircle} color="gray.300" />}
                />
                <Input
                  type="username"
                  placeholder='Username'
                  name='username'
                  onChange={handleChange}
                  value={formData.username}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>E-mail</FormLabel>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AtSignIcon color="gray.300" />}
                />
                <Input
                  type="email"
                  placeholder='E-mail'
                  name='email'
                  onChange={handleChange}
                  value={formData.email}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputLeftElement
                  pointerEvents="none"
                  children={<LockIcon color="gray.300" />}
                />
                <Input
                  type="password"
                  placeholder='Password'
                  name='password'
                  onChange={handleChange}
                  value={formData.password}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{ bg: 'blue.500' }}
                >
                  Log In
                </Button>
                <Stack align={'start'}>
                  <Link as={Link} to={'/login'} color={'blue.400'}>Log In</Link>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignupForm;