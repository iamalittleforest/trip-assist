// import react dependencies 
import React from 'react';
import { FaGithub } from 'react-icons/fa';

// import chakra dependencies
import {
  Box,
  Button,
  Container,
  Stack,
  Text
} from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      bg={'blue.700'}
      color={'white'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2021 Trip Assist.</Text>
        <Stack direction={'row'} spacing={5}>
          <Button
            as='a'
            href={'https://github.com/iamalittleforest/project-3-trip-assist'}
            colorScheme='github'
            leftIcon={<FaGithub />}
            _hover={{ color: 'gray.400' }}
          >
            GitHub
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;