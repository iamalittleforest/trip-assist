// import dependency
import { gql } from "@apollo/client";

// define mutaion for login
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// define mutation for adding a user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// define mutation for saving a poi
export const SAVE_POI = gql`
  mutation savePOI($POIToSave: POIInput) {
    savePOI(POIToSave: $POIToSave) {
      _id
      username
      email
      savedPoi {
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

// define mutation for removing a poi
export const REMOVE_POI = gql`
  mutation removePOI($placeId: ID!) {
    removePOI(placeId: $placeId) {
      _id
      username
      email
      savedPoi {
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
