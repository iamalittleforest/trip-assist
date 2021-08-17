// import react dependencies
import React, { useData } from 'react';
import { Link } from 'react-router-dom';

// import chakra dependencies
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputLeftElement,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons'

// import apollo dependency
import { useMutation } from '@apollo/client';

// import utils dependencies
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {

  const [formData, setFormData] = useData({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formData.email, password: formData.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

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
          <Heading fontSize={'4xl'}>Sign In</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleFormSubmit}>
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
                  Sign In
                </Button>
                <Stack align={'start'}>
                  <Link as={Link} to={'/signup'} color={'blue.400'}>Sign Up</Link>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;