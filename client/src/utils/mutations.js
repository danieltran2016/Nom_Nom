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

export const UPDATE_COMMENTINPLACESILIKE = gql`
  mutation updateCommentInPlacesILike($restaurantId: ID!, $comment: String) {
    updateCommentInPlacesILike(restaurantId: $restaurantId, comment: $comment) {
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

export const ADDTO_PLACESIDONTLIKE = gql`
  mutation addToPlacesIDontLike($name: String!, $address: String!) {
    addToPlacesIDontLike(name: $name, address: $address) {
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

export const REMOVEFROM_PLACESIDONTLIKE = gql`
  mutation removeFromPlacesIDontLike($restaurantId: ID!) {
    removeFromPlacesIDontLike(restaurantId: $restaurantId) {
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

export const UPDATE_COMMENTINPLACESIDONTLIKE = gql`
  mutation updateCommentInPlacesIDontLike($restaurantId: ID!, $comment: String) {
    updateCommentInPlacesIDontLike(restaurantId: $restaurantId, comment: $comment) {
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

export const MOVE_RESTAURANTTOPLACESILIKE = gql`
  mutation moveRestaurantToPlacesILike($restaurantId: ID!) {
    moveRestaurantToPlacesILike(restaurantId: $restaurantId) {
      placesToGo {
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
      placesILike {
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
  }
`;

export const MOVE_RESTAURANTTOPLACESIDONTLIKE = gql`
  mutation moveRestaurantToPlacesIDontLike($restaurantId: ID!) {
    moveRestaurantToPlacesIDontLike(restaurantId: $restaurantId) {
      placesToGo {
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
      placesIDontLike {
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
  }
`;