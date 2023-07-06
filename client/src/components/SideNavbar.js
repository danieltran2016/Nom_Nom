import React from 'react';
// Import Link component for all internal application hyperlinks
import { Link } from 'react-router-dom';

const SideNavbar = () => {
  return (
    <div className="container">
        <div class="PlacesToGo">
            <Link
                className="text-warning"
                to={`/`}
            >
                Places To Go
            </Link>
        </div>
        <div class="PlacesILike">
            <Link
                className="text-warning"
                to={`/PlacesILike`}
            >
                Places I Like
            </Link>
        </div>
        <div class="PlacesIDontLike">
            <Link
                className="text-warning"
                to={`/PlacesIDontLike`}
            >
                Places I Dont Like
            </Link>
        </div>
    </div>
  );
};

export default SideNavbar;