import React from 'react';
import { useQuery } from '@apollo/client';

import {PlaceIDontLikeCardsWithComments} from '../components/PlaceCardsWithComments';

import { GET_PLACESIDONTLIKE } from '../utils/queries'

const PlacesIDontLike = () => {
  const { loading, data } = useQuery(GET_PLACESIDONTLIKE);
  const restaurants = data?.getPlacesIDontLike.restaurants || [];
  // const restaurants = [
  //   {
  //     restaurant: {
  //       name: 'Starbuck',
  //       address: '123',
  //     },
  //     comment: 'It is awful'
  //   },
  //   {
  //     restaurant: {
  //       name: 'Starbuck',
  //       address: '456',
  //     },
  //     comment: 'It is awful'
  //   },
  //   {
  //     restaurant: {
  //       name: 'Starbuck',
  //       address: '789',
  //     },
  //     comment: 'It is awful'
  //   },
  // ];

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <PlaceIDontLikeCardsWithComments
          restaurants={restaurants}
        />
      )}
    </main>
  );
};

export default PlacesIDontLike;