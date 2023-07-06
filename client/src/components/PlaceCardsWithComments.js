import React from 'react';
import { useMutation } from '@apollo/client';
import { RiDeleteBin2Line } from 'react-icons/fa';
import { REMOVEFROM_PLACESILIKE } from '../utils/mutations';

const PlaceCardsWithComments = ({ getPlacesILike }) => {
  const { restaurants } = getPlacesILike;

  if (!restaurants.length) {
    return <h3>No restaurants found</h3>;
  }

  const [removeFromPlacesILike] = useMutation(REMOVEFROM_PLACESILIKE);

  const handleDelete = (restaurantId) => {
    removeFromPlacesILike({
      variables: { restaurantId },
      update(cache) {
        // Update the cache if needed after removing the restaurant
        // This can involve modifying the `getPlacesILike` query cache data
      },
    })
      .then(({ data }) => {
        console.log('Restaurant successfully deleted:', data);
      })
      .catch((error) => {
        console.error('Error deleting restaurant:', error);
      });
  };

  return (
    <div>
      {restaurants.map((restaurant) => (
        <div key={restaurant.restaurant._id} className="card mb-3">
          <div className="card-header bg-primary text-light p-2">
            <h3>{restaurant.restaurant.name}</h3>
            <button
              className="btn btn-danger btn-sm"
              style={{ position: 'absolute', top: '5px', right: '5px' }}
              onClick={() => handleDelete(restaurant.restaurant._id)}
            >
              <RiDeleteBin2Line />
            </button>
          </div>
          <div className="card-body bg-light p-2">
            <p>{restaurant.restaurant.address}</p>
            {restaurant.comment.map((comment) => (
              <div key={comment._id} className="card mb-3">
                <div className="card-body bg-light p-2">
                  <p>{comment.commentText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaceCardsWithComments;
