import React from 'react';
import { Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PlacesToGoForm, PlacesILikeForm, PlacesIDontLikeForm } from './SideAddForm';
import { BiHappyHeartEyes, BiSolidDislike } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';

const SideNavbar = () => {
  return (
    <div>
      <Container className="pb-5 pt-3">
        <Link to="/PlacesToGo" className="text-warning">
          Places To Go {''}
          <FaHeart size={25} style={{ display: 'inline-block', marginBottom: '5px' }} />
        </Link>
        <PlacesToGoForm />
      </Container>
      <Container className="pb-5">
        <Link to="/PlacesILike" className="text-warning">
          Places I Like {''}
          <BiHappyHeartEyes size={30} style={{ display: 'inline-block', marginBottom: '5px' }} />
        </Link>
        <PlacesILikeForm />
      </Container>
      <Container className="pb-5">
        <Link to="/PlacesIDontLike" className="text-warning">
          Places I Don't Like {''}
          <BiSolidDislike size={30} style={{ display: 'inline-block', marginBottom: '5px' }} />
        </Link>
        <PlacesIDontLikeForm />
      </Container>
    </div>
  );
};

export default SideNavbar;
