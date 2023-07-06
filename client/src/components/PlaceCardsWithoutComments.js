import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
//*VscKebabVertical icon available in the react-icons/vsc package
import { VscKebabVertical } from 'react-icons/vsc';
import {
  MOVE_RESTAURANTTOPLACESILIKE,
  MOVE_RESTAURANTTOPLACESIDONTLIKE,
  REMOVEFROM_PLACESTOGO
} from '../utils/mutations';

import Auth from '../utils/auth';

const PlaceCardsWithoutComments = ({ restaurants }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [moveRestaurantToPlacesILike] = useMutation(MOVE_RESTAURANTTOPLACESILIKE);
  const [moveRestaurantToPlacesIDontLike] = useMutation(MOVE_RESTAURANTTOPLACESIDONTLIKE);
  const [removeFromPlacesToGo] = useMutation(REMOVEFROM_PLACESTOGO);

  if (!restaurants.length) {
    return <h3>No restaurants found</h3>;
  }

  const handleMenuToggle = (index) => {
    setMenuVisible((prev) => (prev === index ? false : index));
  };

  const handleMoveRestaurantToPlacesILike = async (restaurantId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await moveRestaurantToPlacesILike ({
        variables: {restaurantId}
      });
      console.log('Restaurant moved to Places I Like');
      window.location.reload();
    } catch (err) {
      console.error('Error moving restaurant:', err.message);
    }
  };

  const handleMoveRestaurantToPlacesIDontLike = async (restaurantId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await moveRestaurantToPlacesIDontLike ({
        variables: {restaurantId}
      });
      console.log('Restaurant moved to Places I Dont Like');
      window.location.reload();
    } catch (err) {
      console.error('Error moving restaurant:', err.message);
    }
  };

  const handleDelete = async (restaurantId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeFromPlacesToGo ({
        variables: {restaurantId}
      });
      console.log('Restaurant removed from Places To Go');
      window.location.reload();
    } catch (err) {
      console.error('Error removing restaurant:', err.message);
    }
  };

  return (
    <div>
      {restaurants.map((restaurant, index) => (
        <div
          key={restaurant._id}
          className="card mb-3"
          onMouseEnter={() => handleMenuToggle(index)}
          onMouseLeave={() => handleMenuToggle(false)}
        >
          <div className="card-header bg-white text-dark p-2">
            <h3>{restaurant.name}</h3>
            {menuVisible === index&& (
              <div className="menu-container">
                <div className="menu-links">
                  <button className="bg-dark text-warning" onClick={() => handleMoveRestaurantToPlacesILike(restaurant._id)}>
                    Add to Places I Like
                  </button>
                  <button className="bg-dark text-warning" onClick={() => handleMoveRestaurantToPlacesIDontLike(restaurant._id)}>
                    Add to Places I Don't Like
                  </button>
                  <button className="bg-dark text-warning" onClick={() => handleDelete(restaurant._id)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="card-body bg-light p-2">
            <p>{restaurant.address}</p>
          </div>
          {menuVisible === index && (
            <div className="menu-icon">
              <VscKebabVertical />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlaceCardsWithoutComments;



