// import react dependency
import React from 'react';

// import chakra dependency
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Text,
  Stack,
} from '@chakra-ui/react';

const POICard = ({ name, img, business_status, rating, isLoggedIn, POI_id, savedPOIIds, handleSavePOI }) => {
  return (
    <Center px={5} py={5}>
      <Box
        maxW={'400px'}
        w={'full'}
        bg={'white'}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box
          h={'250px'}
          mt={-6}
          mx={-6}
          mb={6}
          overflow={'hidden'}
        >
          <Image
            src={img}
            style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
          />
        </Box>
        <Stack>
          <Stack mb={3}>
            <Heading
              color={'black'}
              fontSize={'2xl'}
              fontFamily={'body'}
            >
              {name}
            </Heading>
            <Text color={'black'}>Status: {business_status}</Text>
            <Text color={'black'}>Rating: {rating}</Text>
          </Stack>
          <Stack>
            {isLoggedIn && (
              <Button
                bg={'blue.500'}
                color={'white'}
                _hover={{ bg: 'blue.700' }}
                disabled={savedPOIIds?.some(
                  (savedPOIId) => savedPOIId === POI_id
                )}
                onClick={() => handleSavePOI(POI_id)}
              >
                {savedPOIIds?.some(
                  (savedPOIId) => savedPOIId === POI_id
                )
                  ? 'Saved to Collection'
                  : 'Add to Collection'}
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default POICard;