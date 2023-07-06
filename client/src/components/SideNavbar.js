import React from 'react';
// Import Link component for all internal application hyperlinks
import { Link } from 'react-router-dom';
import PlacesToGoForm from './SideAddForm';

const SideNavbar = () => {
  return (
    <>
      <div class="container">
        <Link
          className="text-warning"
          to={`/`}
        >
          Places To Go
        </Link>
        <PlacesToGoForm />
      </div>
      <div class="container">
        <Link
          className="text-warning"
          to={`/PlacesILike`}
        >
          Places I Like
        </Link>
      </div>
      <div class="container">
        <Link
          className="text-warning"
          to={`/PlacesIDontLike`}
        >
          Places I Dont Like
        </Link>
      </div>
    </>
  );
};

export default SideNavbar;