import React from 'react';
// Import Link component for all internal application hyperlinks
import { Link } from 'react-router-dom';
import { PlacesToGoForm, PlacesILikeForm, PlacesIDontLikeForm } from './SideAddForm';

const SideNavbar = () => {
  return (
    <>
      <div class="container pb-5">
        <Link
          className="text-warning"
          to={`/`}
        >
          Places To Go
        </Link>
        <PlacesToGoForm />
      </div>
      <div class="container pb-5">
        <Link
          className="text-warning"
          to={`/PlacesILike`}
        >
          Places I Like
        </Link>
        <PlacesILikeForm />
      </div>
      <div class="container pb-5">
        <Link
          className="text-warning"
          to={`/PlacesIDontLike`}
        >
          Places I Dont Like
        </Link>
        <PlacesIDontLikeForm />
      </div>
    </>
  );
};

export default SideNavbar;