import React from 'react';

const PlaceCardsWithComments = ({ getPlacesILike }) => {
  const { restaurants } = getPlacesILike;

  if (!restaurants.length) {
    return <h3>No restaurants found</h3>;
  }

  return (
    <div>
      {restaurants.map((restaurant) => (
        <div key={restaurant.restaurant._id}>
          <h3>{restaurant.restaurant.name}</h3>
          <p>{restaurant.restaurant.address}</p>
          {restaurant.comment.map((comment) => (
            <div key={comment._id} className="card mb-3">
              <div className="card-body bg-light p-2">
                <p>{comment.commentText}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlaceCardsWithComments;
