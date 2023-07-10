import { gql } from '@apollo/client';

export const GET_PLACESTOGO = gql`
  query getPlacesToGo {
    getPlacesToGo {
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

export const GET_PLACESILIKE = gql`
  query getPlacesILike {
    getPlacesILike {
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

export const GET_PLACESIDONTLIKE = gql`
  query getPlacesIDontLike {
    getPlacesIDontLike {
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
