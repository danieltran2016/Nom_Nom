import React from 'react';
import { Nav, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PlacesToGoForm, PlacesILikeForm, PlacesIDontLikeForm } from './SideAddForm';

const SideNavbar = () => {
  return (
    <div>
      <Container className="pb-5 pt-3">
        <Nav.Link as={Link} to={`/`} className="text-warning">
          Places To Go
        </Nav.Link>
        <PlacesToGoForm />
      </Container>
      <Container className="pb-5">
        <Nav.Link as={Link} to={`/PlacesILike`} className="text-warning">
          Places I Like
        </Nav.Link>
        <PlacesILikeForm />
      </Container>
      <Container className="pb-5">
        <Nav.Link as={Link} to={`/PlacesIDontLike`} className="text-warning">
          Places I Don't Like
        </Nav.Link>
        <PlacesIDontLikeForm />
      </Container>
    </div>
  );
};

export default SideNavbar;
