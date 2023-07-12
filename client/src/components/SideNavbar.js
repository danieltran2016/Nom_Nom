import React from 'react';
import { Nav, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PlacesToGoForm, PlacesILikeForm, PlacesIDontLikeForm } from './SideAddForm';

const SideNavbar = () => {
  return (
    <div>
      <Container className="pb-5 pt-3">
        <Link as={Link} to={`/PlacesToGo`} className="text-warning">
          Places To Go
        </Link>
        <PlacesToGoForm />
      </Container>
      <Container className="pb-5">
        <Link as={Link} to={`/PlacesILike`} className="text-warning">
          Places I Like
        </Link>
        <PlacesILikeForm />
      </Container>
      <Container className="pb-5">
        <Link as={Link} to={`/PlacesIDontLike`} className="text-warning">
          Places I Don't Like
        </Link>
        <PlacesIDontLikeForm />
      </Container>
    </div>
  );
};

export default SideNavbar;
