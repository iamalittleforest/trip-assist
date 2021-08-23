// import dependency
import { gql } from "@apollo/client";

// define query
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedPOIs {
        POI_id
        name
        img
        business_status
        rating
        vicinity
        types
      }
    }
  }
`;

export const QUERY_KEY = gql`
  query getKey {
    getKey
  }
`;
