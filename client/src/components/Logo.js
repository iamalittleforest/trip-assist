// import react dependency
import React from 'react';

// import chakra dependency
import { Box, Text } from '@chakra-ui/react';

const Logo = (props) => {
  return (
    <Box {...props}>
      <Text fontSize='lg' fontWeight='bold'>
        Trip Assist
      </Text>
    </Box>
  );
}

export default Logo;