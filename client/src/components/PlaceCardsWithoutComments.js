import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { VscKebabVertical } from 'react-icons/fa';
import { ADDTO_PLACESILIKE } from '../utils/mutations';

const PlaceCardsWithoutComments = ({ getPlacesToGo }) => {
  const { restaurants } = getPlacesToGo;

  if (!restaurants.length) {
    return <h3>No restaurants found</h3>;
  }

  const [menuVisible, setMenuVisible] = useState(false);
  const [addToPlacesILike] = useMutation(ADDTO_PLACESILIKE);

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

  const handleAddToPlacesIDontLike = (restaurantId) => {
    console.log('Adding to Places I Don\'t Like:', restaurantId);
    // Implement the logic to add the restaurant to Places I Don't Like
  };

  const handleDelete = (restaurantId) => {
    console.log('Deleting restaurant:', restaurantId);
    // Implement the logic to delete the restaurant
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
            {menuVisible === index && (
              <div className="menu-container">
                <div className="menu-links">
                  <button onClick={() => handleAddToPlacesILike(restaurant)}>
                    Add to Places I Like
                  </button>
                  <button
                    onClick={() => handleAddToPlacesIDontLike(restaurant._id)}
                  >
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


