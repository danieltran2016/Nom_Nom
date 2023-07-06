import React from 'react';
import { Restaurant } from '../../../server/models';

const PlaceCardsWithComments = ({ name, address, comment }) => {
  if (!Restaurant.length) {
    return <h3>Restaurant not found</h3>;
  }

  return (
    <div>
      <h3>{name}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {thought.thoughtAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                had this thought on {thought.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlaceCardsWithComments;
