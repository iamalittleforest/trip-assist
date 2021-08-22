// import react dependency
import React from 'react';

// import chakra dependency
import {
  Box,
  Center,
  Heading,
  Image,
  Text,
  Stack,
} from '@chakra-ui/react';

export const POICard = ({ name, img, business_status, rating }) => {
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={'white'}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
          overflow={'hidden'}
          boxSize='sm'
        >
          <Image
            boxSize='200px'
            src={img}
            layout={'objectFit'}
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Stack>
          <Heading
            color={'black'}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {name}
          </Heading>
          <Text color={'black'}>Status: {business_status}</Text>
          <Text color={'black'}>Rating: {rating}</Text>
          {/* {Auth.loggedIn() && (
            <Button
              disabled={savedPOIIds?.some(
                (savedPOIId) => savedPOIId === POI.POI_id
              )}
              className='btn-block btn-info'
              onClick={() => handleSavePOI(POI.POI_id)}
            >
              {savedPOIIds?.some(
                (savedPOIId) => savedPOIId === POI.POI_id
              )
                ? 'Saved to Collection'
                : 'Add to Collection'}
            </Button>
          )} */}
        </Stack>
      </Box>
    </Center>
  );
};

export default POICard;