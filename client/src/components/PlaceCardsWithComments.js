import React from 'react';

const PlaceCardsWithComments = ({ getPlacesILike }) => {
  const { restaurants } = getPlacesILike;

  if (!restaurants.length) {
    return <h3>No restaurants found</h3>;
  }
    const handleDelete = (restaurantId) => {
    console.log('Deleting restaurant with ID:', restaurantId);
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
              X
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

