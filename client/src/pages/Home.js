import React from 'react';
import { Card } from 'react-bootstrap';

const Home = () => {
  return (
    <Card className="card mt-3" style={{ width: '100%', maxWidth: '45rem' }}>
      <Card.Body>
        <h3 className="text-warning">Welcome to Nom Nom</h3>
        <h6 className="text-dark">
          With Nom Nom, you can easily keep track of the restaurants you want to visit, the ones you love, and the ones you'd rather avoid.
        </h6>
        <h6 className="text-secondary">
          Having trouble deciding where to eat? Let our randomizer take the guesswork out of the equation.
        </h6>
        <h6>
          Want to explore local restaurants? Our integration with Google Places lets you search for restaurants in your area effortlessly.
        </h6>
      </Card.Body>
    </Card>
  );
};

export default Home;
