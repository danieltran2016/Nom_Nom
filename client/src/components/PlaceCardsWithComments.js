import React from 'react';
import { useMutation } from '@apollo/client';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { REMOVEFROM_PLACESILIKE, REMOVEFROM_PLACESIDONTLIKE } from '../utils/mutations';

import Auth from '../utils/auth';

const PlaceILikeCardsWithComments = ({ restaurants }) => {
  const [removeFromPlacesILike] = useMutation(REMOVEFROM_PLACESILIKE);

  if (!restaurants.length) {
    return <h3>No restaurants found</h3>;
  }

  const handleDelete = async(restaurantId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeFromPlacesILike ({
        variables: {restaurantId}
      });
      console.log('Restaurant removed from Places I Like');
      window.location.reload();
    } catch (err) {
      console.error('Error removing restaurant:', err.message);
    }
  };

  return (
    <div>
      {restaurants.map((restaurant) => (
        <div key={restaurant.restaurant._id} className="card mb-3">
          <div className="card-header bg-white text-dark p-2">
            <h3>{restaurant.restaurant.name}</h3>
            <button
              className="btn btn-warning btn-sm"
              style={{ position: 'absolute', top: '5px', right: '5px' }}
              onClick={() => handleDelete(restaurant.restaurant._id)}
            >
              <RiDeleteBin2Line />
            </button>
          </div>
          <div className="card-body bg-light p-2">
            <p>{restaurant.restaurant.address}</p>
              <div className="card mb-3">
                <div className="card-body bg-light-emphasis p-2">
                  <p>{restaurant.comment}</p>
                </div>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const PlaceIDontLikeCardsWithComments = ({ restaurants }) => {
  const [removeFromPlacesIDontLike] = useMutation(REMOVEFROM_PLACESIDONTLIKE);

  if (!restaurants.length) {
    return <h3>No restaurants found</h3>;
  }

  const handleDelete = async(restaurantId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeFromPlacesIDontLike ({
        variables: {restaurantId}
      });
      console.log('Restaurant removed from Places I Dont Like');
      window.location.reload();
    } catch (err) {
      console.error('Error removing restaurant:', err.message);
    }
  };

  return (
    <div>
      {restaurants.map((restaurant) => (
        <div key={restaurant.restaurant._id} className="card mb-3">
          <div className="card-header bg-white text-dark p-2">
            <h3>{restaurant.restaurant.name}</h3>
            <button
              className="btn btn-warning btn-sm"
              style={{ position: 'absolute', top: '5px', right: '5px' }}
              onClick={() => handleDelete(restaurant.restaurant._id)}
            >
              <RiDeleteBin2Line />
            </button>
          </div>
          <div className="card-body bg-light p-2">
            <p>{restaurant.restaurant.address}</p>
              <div className="card mb-3">
                <div className="card-body bg-light-emphasis p-2">
                  <p>{restaurant.comment}</p>
                </div>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export {PlaceILikeCardsWithComments, PlaceIDontLikeCardsWithComments};
