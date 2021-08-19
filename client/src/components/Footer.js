// import react dependencies 
import React from 'react';
import { VscGithub } from "react-icons/vsc";

// import chakra dependencies
import {
  Box,
  IconButton,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>© 2021 Trip Assist. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label="GitHub"
            fontSize="20px"
            icon={<VscGithub />}
            // onClick={}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;