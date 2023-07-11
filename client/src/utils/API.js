// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save book data for a logged in user
export const saveBook = (bookData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}; 

// // make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
// export const searchGoogleBooks = (query) => {
//   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// };

// export const searchGooglePlaces = (location, search) => {
//   return fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json
//   ?location=${location}121.2121%2c12.21
//   &query=${search}
//   &radius=1610
//   &key=AIzaSyDhTdmCx9-UZnUegQ3CynW5eP68S3SFSkQ`);
// };

// export const searchGeolocation = (zip) => {
//   return fetch(`https://maps.googleapis.com/maps/api/geocode/json
//   ?address=${zip}
//   &key=AIzaSyDhTdmCx9-UZnUegQ3CynW5eP68S3SFSkQ`);
// };
// const zip = 78258;