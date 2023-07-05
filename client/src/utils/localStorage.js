// export const getSavedBookIds = () => {
//   const savedBookIds = localStorage.getItem('saved_books')
//     ? JSON.parse(localStorage.getItem('saved_books'))
//     : [];

//   return savedBookIds;
// };

// export const saveBookIds = (bookIdArr) => {
//   if (bookIdArr.length) {
//     localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
//   } else {
//     localStorage.removeItem('saved_books');
//   }
// };

// export const removeBookId = (bookId) => {
//   const savedBookIds = localStorage.getItem('saved_books')
//     ? JSON.parse(localStorage.getItem('saved_books'))
//     : null;

//   if (!savedBookIds) {
//     return false;
//   }

//   const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
//   localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

//   return true;
// };

export const getSavedRestaurantIds = () => {
  const savedRestaurantIds = localStorage.getItem('saved_restaurants')
    ? JSON.parse(localStorage.getItem('saved_restaurants'))
    : [];

  return savedRestaurantIds;
};

export const saveRestaurantIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_restaurants', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_restaurants');
  }
};

export const removeRestaurantId = (restaurantId) => {
  const savedRestaurantIds = localStorage.getItem('saved_restaurants')
    ? JSON.parse(localStorage.getItem('saved_restaurants'))
    : null;

  if (!savedRestaurantIds) {
    return false;
  }

  const updatedSavedRestaurantIds = savedRestaurantIds?.filter((savedRestaurantId) => savedRestaurantId !== restaurantId);
  localStorage.setItem('saved_restaurants', JSON.stringify(updatedSavedRestaurantIds));

  return true;
};
