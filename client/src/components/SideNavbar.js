import React from 'react';

const SideNavbar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li></li>

        <li>Places I Like </li>

        <li>Places I Dont Like</li>
        <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/`}
                >
                  Places To Go
                </Link>
                
        
      </ul>
    </div>
  );
};

export default SideNavbar;
