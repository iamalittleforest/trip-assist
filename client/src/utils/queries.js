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
        placeId: String!
        name: String!
        img: String
        business_status: String
        rating: Number
        vicinity: String
      }
    }
  }
`;

