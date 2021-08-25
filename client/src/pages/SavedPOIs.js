// import react dependency
import React from "react";

// import chakra dependency
import {
  Box,
  Flex,
  Heading,
  Stack
} from '@chakra-ui/react';

// import apollo dependency
import { useQuery, useMutation } from "@apollo/client";

// import utils dependencies
import { QUERY_ME } from "../utils/queries";
import { REMOVE_POI } from "../utils/mutations";
import { removePOIId } from "../utils/localStorage";
import Auth from "../utils/auth";

// import component
import POICard from "../components/POICard";

const SavedPOIs = () => {
  // set query for pulling data
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  // set mutation for removing POI
  const [removePOI] = useMutation(REMOVE_POI);

  // create function to handle deleting a POI
  const handleDeletePOI = async (POI_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // remove POI
    try {
      const response = await removePOI({
        variables: { POI_id },
      });

      if (!response.data) {
        throw new Error("something went wrong!");
      }

      // remove POI from localStorage
      removePOIId(POI_id);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Flex
        direction={'row'}
        minH={'15vh'}
        align={'center'}
        justify={'center'}
        bg={'gray.100'}>
        <Stack spacing={5} mx={'auto'} maxW={'lg'}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>
              {userData.savedPOIs.length
                ? "Viewing Your Collection"
                : "Add to Your Collection!"}
            </Heading>
          </Stack>
        </Stack>
      </Flex>

      <Box bg={'gray.100'}>
        {userData.savedPOIs.map((POI) => {
          console.log(POI);
          return (
            <POICard
              {...POI}
              key={POI.POI_id}
              isSaved={true}
              handleDelete={handleDeletePOI}
            />
          );
        })}
      </Box>
    </>
  );
};

export default SavedPOIs;
