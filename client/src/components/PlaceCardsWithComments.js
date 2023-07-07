import React from 'react';
import { useMutation } from '@apollo/client';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { Button, Card } from 'react-bootstrap';
import { REMOVEFROM_PLACESILIKE, REMOVEFROM_PLACESIDONTLIKE } from '../utils/mutations';

import Auth from '../utils/auth';

const PlaceILikeCardsWithComments = ({ restaurants }) => {
  const [removeFromPlacesILike] = useMutation(REMOVEFROM_PLACESILIKE);

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

  return (
    <div className="card-grid" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {restaurants.map((restaurant) => (
        <Card
          key={restaurant.restaurant._id}
          className="card mb-3"
          style={{ width: '50%' }}
        >
          <Card.Header className="bg-warning text-dark p-2">
            <h3>{restaurant.restaurant.name}</h3>
            <Button
              variant="dark"
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
    </div>
  );
};

const PlaceIDontLikeCardsWithComments = ({ restaurants }) => {
  const [removeFromPlacesIDontLike] = useMutation(REMOVEFROM_PLACESIDONTLIKE);

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
            <h3>{restaurant.restaurant.name}</h3>
            <Button
              variant="dark"
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
    </div>
  );
};

export { PlaceILikeCardsWithComments, PlaceIDontLikeCardsWithComments };
