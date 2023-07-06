import React from 'react';
import { Restaurant } from '../../../server/models';

const PlaceCardsWithComments = ({ name, address, comments }) => {
  if (!comments.length) {
    return <h3>No comments found for the restaurant</h3>;
  }

  return (
    <div>
      <h3>{name}</h3>
      <p>{address}</p>
      {comments.map((comment) => (
        <div key={comment._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            {comment.commentAuthor} <br />
            <span style={{ fontSize: '1rem' }}>
              commented on {comment.createdAt}
            </span>
          </h4>
          <div className="card-body bg-light p-2">
            <p>{comment.commentText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaceCardsWithComments;
