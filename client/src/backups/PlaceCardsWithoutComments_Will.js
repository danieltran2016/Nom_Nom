import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { VscKebabVertical } from 'react-icons/fa';
import {
  MOVE_RESTAURANTTOPLACESILIKE,
  MOVE_RESTAURANTTOPLACESIDONTLIKE,
  REMOVEFROM_PLACESTOGO
} from '../utils/mutations';

const PlaceCardsWithoutComments = ({ getPlacesToGo }) => {
  const { restaurants } = getPlacesToGo;

  if (!restaurants.length) {
    return <h3>No restaurants found</h3>;
  }

  const [menuVisible, setMenuVisible] = useState(false);
  const [addToPlacesILike] = useMutation(MOVE_RESTAURANTTOPLACESILIKE);
  const [addToPlacesIDontLike] = useMutation(MOVE_RESTAURANTTOPLACESIDONTLIKE);
  const [removeFromPlacesToGo] = useMutation(REMOVEFROM_PLACESTOGO);

  const handleMenuToggle = (index) => {
    setMenuVisible((prev) => (prev === index ? false : index));
  };

  const handleAddToPlacesILike = (restaurant) => {
    addToPlacesILike({
      variables: {
        name: restaurant.name,
        address: restaurant.address,
      },
      update(cache, { data: { addToPlacesILike } }) {
      },
    })
      .then(({ data }) => {
        console.log('Restaurant added to Places I Like:', data.addToPlacesILike);
      })
      .catch((error) => {
        console.error('Error adding restaurant to Places I Like:', error);
      });
  };

  const handleAddToPlacesIDontLike = (restaurant) => {
    addToPlacesIDontLike({
      variables: {
        name: restaurant.name,
        address: restaurant.address,
      },
      update(cache, { data: { addToPlacesIDontLike } }) {
      },
    })
      .then(({ data }) => {
        console.log(
          'Restaurant added to Places I Don\'t Like:',
          data.addToPlacesIDontLike
        );
      })
      .catch((error) => {
        console.error(
          'Error adding restaurant to Places I Don\'t Like:',
          error
        );
      });
  };

  const handleDelete = (restaurantId) => {
    console.log('Deleting restaurant:', restaurantId);
    removeFromPlacesToGo({
      variables: {
        restaurantId: restaurantId,
      },
      update(cache, { data: { removeFromPlacesToGo } }) {
      },
    })
      .then(({ data }) => {
        console.log('Restaurant deleted:', data.removeFromPlacesToGo);
      })
      .catch((error) => {
        console.error('Error deleting restaurant:', error);
      });
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
          <div className="card-header bg-primary text-light p-2">
            <h3>{restaurant.name}</h3>
            {menuVisible === index&& (
              <div className="menu-container">
                <div className="menu-links">
                  <button onClick={() => handleAddToPlacesILike(restaurant)}>
                    Add to Places I Like
                  </button>
                  <button onClick={() => handleAddToPlacesIDontLike(restaurant)}>
                    Add to Places I Don't Like
                  </button>
                  <button onClick={() => handleDelete(restaurant._id)}>
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

