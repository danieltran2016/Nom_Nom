import React from 'react';
import { VscKebabVertical } from 'react-icons/fa';

const PlaceCardsWithoutComments = ({ getPlacesToGo }) => {
  const { restaurants } = getPlacesToGo;

  if (!restaurants.length) {
    return <h3>No restaurants found</h3>;
  }

  return (
    <div>
      {restaurants.map((restaurant) => (
        <div key={restaurant._id} className="card mb-3">
          <div className="card-header bg-primary text-light p-2">
            <h3>{restaurant.name}</h3>
          </div>
          <div className="card-body bg-light p-2">
            <p>{restaurant.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaceCardsWithoutComments;
