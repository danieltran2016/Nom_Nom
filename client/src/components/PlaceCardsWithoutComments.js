import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { VscKebabVertical } from 'react-icons/vsc';
import { Button, Card } from 'react-bootstrap';
import {
  MOVE_RESTAURANTTOPLACESILIKE,
  MOVE_RESTAURANTTOPLACESIDONTLIKE,
  REMOVEFROM_PLACESTOGO
} from '../utils/mutations';

import Auth from '../utils/auth';

const PlaceCardsWithoutComments = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [moveRestaurantToPlacesILike] = useMutation(MOVE_RESTAURANTTOPLACESILIKE);
  const [moveRestaurantToPlacesIDontLike] = useMutation(MOVE_RESTAURANTTOPLACESIDONTLIKE);
  const [removeFromPlacesToGo] = useMutation(REMOVEFROM_PLACESTOGO);

  if (!restaurants.length) {
    return <h3>No restaurants found</h3>;
  }

  const handleMenuToggle = (restaurantId) => {
    if (selectedRestaurant === restaurantId) {
      setSelectedRestaurant(null);
    } else {
      setSelectedRestaurant(restaurantId);
    }
  };

  const handleMoveRestaurantToPlacesILike = async (restaurantId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await moveRestaurantToPlacesILike({
        variables: { restaurantId }
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
      const { data } = await moveRestaurantToPlacesIDontLike({
        variables: { restaurantId }
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
      const { data } = await removeFromPlacesToGo({
        variables: { restaurantId }
      });
      console.log('Restaurant removed from Places To Go');
      window.location.reload();
    } catch (err) {
      console.error('Error removing restaurant:', err.message);
    }
  };

  return (
    <div className="card-grid" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {restaurants.map((restaurant) => (
        <Card
          key={restaurant._id}
          className="card mb-3"
          style={{ width: '50%' }}
        >
          <Card.Header className="bg-warning text-dark p-2">
            <h3>{restaurant.name}</h3>
            {selectedRestaurant === restaurant._id && (
              <div className="menu-container">
                <div className="menu-links">
                  <Button variant="dark" className="text-warning" onClick={() => handleMoveRestaurantToPlacesILike(restaurant._id)}>
                    Add to Places I Like
                  </Button>
                  <Button variant="dark" className="text-warning" onClick={() => handleMoveRestaurantToPlacesIDontLike(restaurant._id)}>
                    Add to Places I Don't Like
                  </Button>
                  <Button variant="dark" className="text-warning" onClick={() => handleDelete(restaurant._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </Card.Header>
          <Card.Body className="bg-light p-2">
            <p>{restaurant.address}</p>
          </Card.Body>
          <div className="menu-icon" onClick={() => handleMenuToggle(restaurant._id)}>
            <VscKebabVertical />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PlaceCardsWithoutComments;

