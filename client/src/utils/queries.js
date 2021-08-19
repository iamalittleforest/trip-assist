// import dependency
import { gql } from '@apollo/client';

// define query
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedPOIs {
        placeId
        name
        img
        business_status
        rating
        vicinity
      }
    }
  }
`;
