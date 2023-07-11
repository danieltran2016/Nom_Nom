import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { Button, Card } from 'react-bootstrap';
import { REMOVEFROM_PLACESILIKE, REMOVEFROM_PLACESIDONTLIKE } from '../utils/mutations';

import Auth from '../utils/auth';

const PlaceILikeCardsWithComments = ({ restaurants }) => {
  const [removeFromPlacesILike] = useMutation(REMOVEFROM_PLACESILIKE);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  if (!restaurants.length) {
    return <h3>No restaurants found</h3>;
  }

  const handleDelete = async (restaurantId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeFromPlacesILike({
        variables: { restaurantId }
      });
      console.log('Restaurant removed from Places I Like');
      window.location.reload();
    } catch (err) {
      console.error('Error removing restaurant:', err.message);
    }
  };

  const randomizeRestaurant = () => {
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    const randomRestaurant = restaurants[randomIndex].restaurant;
    setSelectedRestaurant(randomRestaurant.name);
  };

  const clearSelectedRestaurant = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div>
      <div className="card-grid" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {restaurants.map((restaurant) => (
          <Card
            key={restaurant.restaurant._id}
            className="card mb-3"
            style={{ width: '50%' }}
          >
            <Card.Header className="bg-warning text-dark p-2">
              <h3 className="restaurant-name">{restaurant.restaurant.name}</h3>
              <Button
                variant="dark bg-dark text-warning"
                className="btn-sm"
                style={{ position: 'absolute', top: '5px', right: '5px' }}
                onClick={() => handleDelete(restaurant.restaurant._id)}
              >
                <RiDeleteBin2Line />
              </Button>
            </Card.Header>
            <Card.Body className="bg-light p-2">
              <p>{restaurant.restaurant.address}</p>
              <Card className="mb-3">
                <Card.Body className="bg-light-emphasis p-2">
                  <p>{restaurant.comment}</p>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        ))}
        {/* CSS Styling */}
      <style jsx>{`
        @media (max-width: 768px) {
          .restaurant-name {
            font-size: 16px;
          }
        }
      `}</style>
      </div>
      
      <div className="randomizer-container" style={{ width: '50%' }}>
        <h3>Let Fate Decide</h3>
        <Button className="bg-warning text-dark"
                variant="warning" 
                onClick={randomizeRestaurant}>
          Select Random Restaurant
        </Button>
        {selectedRestaurant && (
          <Card className="card mt-3">
            <Card.Body>
              <h5>You Will Nom Nom at:</h5>
              <p>{selectedRestaurant}</p>
            </Card.Body>
          </Card>
        )}
        {selectedRestaurant && (
          <Button className="bg-dark text-warning" 
                  variant=""
                  onClick={clearSelectedRestaurant}>
            Clear Selection
          </Button>
        )}
      </div>
    </div>
  );
};

const PlaceIDontLikeCardsWithComments = ({ restaurants }) => {
  const [removeFromPlacesIDontLike] = useMutation(REMOVEFROM_PLACESIDONTLIKE);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  if (!restaurants.length) {
    return <h3>No restaurants found</h3>;
  }

  const handleDelete = async (restaurantId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeFromPlacesIDontLike({
        variables: { restaurantId }
      });
      console.log('Restaurant removed from Places I Dont Like');
      window.location.reload();
    } catch (err) {
      console.error('Error removing restaurant:', err.message);
    }
  };

  return (
    <div className="card-grid" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {restaurants.map((restaurant) => (
        <Card
          key={restaurant.restaurant._id}
          className="card mb-3"
          style={{ width: '50%' }}
        >
          <Card.Header className="bg-warning text-dark p-2">
            <h3 className="restaurant-name">{restaurant.restaurant.name}</h3>
            <Button
              variant="dark bg-dark text-warning"
              className="btn-sm"
              style={{ position: 'absolute', top: '5px', right: '5px' }}
              onClick={() => handleDelete(restaurant.restaurant._id)}
            >
              <RiDeleteBin2Line />
            </Button>
          </Card.Header>
          <Card.Body className="bg-light p-2">
            <p>{restaurant.restaurant.address}</p>
            <Card className="mb-3">
              <Card.Body className="bg-light-emphasis p-2">
                <p>{restaurant.comment}</p>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      ))}
      {/* CSS Styling */}
      <style jsx>{`
        @media (max-width: 768px) {
          .restaurant-name {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export { PlaceILikeCardsWithComments, PlaceIDontLikeCardsWithComments };
