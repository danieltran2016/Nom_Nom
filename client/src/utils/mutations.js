import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADDTO_PLACESTOGO = gql`
  mutation addToPlacesToGo($name: String!, $address: String!) {
    addToPlacesToGo(name: $name, address: $address) {
      _id
      restaurants {
        _id
        address
        name
      }
      user {
        _id
        email
        username
      }
    }
  }
`;

export const REMOVEFROM_PLACESTOGO = gql`
  mutation removeFromPlacesToGo($restaurantId: ID!) {
    removeFromPlacesToGo(restaurantId: $restaurantId) {
      _id
      restaurants {
        _id
        address
        name
      }
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADDTO_PLACESILIKE = gql`
  mutation addToPlacesILike($name: String!, $address: String!) {
    addToPlacesILike(name: $name, address: $address) {
      _id
      restaurants {
        restaurant {
          _id
          address
          name
        }
        comment
      }
      user {
        _id
        email
        username
      }
    }
  }
`;

export const REMOVEFROM_PLACESILIKE = gql`
  mutation removeFromPlacesILike($restaurantId: ID!) {
    removeFromPlacesILike(restaurantId: $restaurantId) {
      _id
      restaurants {
        restaurant {
          _id
          address
          name
        }
        comment
      }
      user {
        _id
        email
        username
      }
    }
  }
`;

export const REMOVEFROM_PLACESILIKE = gql`
  mutation removeFromPlacesILike($restaurantId: ID!) {
    removeFromPlacesILike(restaurantId: $restaurantId) {
      _id
      restaurants {
        restaurant {
          _id
          address
          name
        }
        comment
      }
      user {
        _id
        email
        username
      }
    }
  }
`;

