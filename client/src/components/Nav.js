// import react dependencies
import React, { useState } from 'react';

// import auth
import Auth from '../utils/auth';

// import chakra dependencies 
import {
  Box,
  Container,
  Flex,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';

import Logo from './Logo';

const Nav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        w='100px'
        color={'white'}
      />
      <NavToggle toggle={toggle} isOpen={isOpen} />
      <NavLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width='24' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
    <title>Close</title>
    <path
      fill='white'
      d='M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z'
    />
  </svg>
);

const NavIcon = () => (
  <svg
    width='24px'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
    fill='white'
  >
    <title>Nav</title>
    <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
  </svg>
);

const NavToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <NavIcon />}
    </Box>
  );
};

const NavItem = ({ children, isLast, to = '/', ...rest }) => {
  return (
    <Link href={to}>
      <Text display='block' {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const NavLinks = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={10}
        align='center'
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <NavItem to='/'>Home</NavItem>
        {Auth.loggedIn() ? (
          <>
            <NavItem to='/savedPOIs'>Collection</NavItem>
            <NavItem onClick={Auth.logout}>Log Out</NavItem>
          </>
        ) : (
          <>
            <NavItem to='/login'>Log In</NavItem>
            <NavItem to='/signup' isLast>Sign Up</NavItem>
          </>
        )}
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Box bg={'blue.700'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        px={0}
      >
        <Flex
          as='nav'
          align='center'
          justify='space-between'
          wrap='wrap'
          w='100%'
          p={5}
          bg={'blue.700'}
          color={'white'}
          {...props}
        >
          {children}
        </Flex>
      </Container>
    </Box>
  );
};

export default Nav;