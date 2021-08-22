// import react dependencies
import React, { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';

// import chakra dependencies
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons'

// import apollo dependency
import { useMutation } from '@apollo/client';

// import utils dependencies
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = (props) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formData.email, password: formData.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (err) {
      console.log(err);
    }
  };

  // handle changes to input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={'gray.50'}>
      <Stack spacing={5} mx={'auto'} maxW={'lg'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Log In</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={'white'}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleFormSubmit}>
            <Stack mb={3}>
              <FormControl id='email' isRequired>
                <FormLabel>E-mail</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<EmailIcon color='gray.300' />}
                  />
                  <Input
                    type='email'
                    placeholder='E-mail'
                    name='email'
                    onChange={handleChange}
                    value={formData.email}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
            <Stack mb={5}>
              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<LockIcon color='gray.300' />}
                  />
                  <Input
                    type='password'
                    placeholder='Password'
                    name='password'
                    onChange={handleChange}
                    value={formData.password}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
            <Stack spacing={3}>
              <Button
                type='submit'
                bg={'blue.500'}
                color={'white'}
                _hover={{ bg: 'blue.700' }}
              >
                Log In
              </Button>
              <Stack align={'start'}>
                <Link as={ReactLink} to='/signup' color={'blue.500'}>Sign Up</Link>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;