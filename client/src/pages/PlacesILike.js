import React from 'react';
import { useQuery } from '@apollo/client';

import {PlaceILikeCardsWithComments} from '../components/PlaceCardsWithComments';

import { GET_PLACESILIKE } from '../utils/queries'

const PlacesILike = () => {
  // const { loading, data } = useQuery(GET_PLACESILIKE);
  // const restaurants = data?.getPlacesILike.restaurants || [];
  const restaurants = [
    {
      restaurant: {
        name: 'Taco Bell',
        address: '123',
      },
      comment: 'It is great'
    },
    {
      restaurant: {
        name: 'Taco Bell',
        address: '456',
      },
      comment: 'It is great'
    },
    {
      restaurant: {
        name: 'Taco Bell',
        address: '789',
      },
      comment: 'It is great'
    },
  ];

  return (
    <main>
      {/* {loading ? (
        <div>Loading...</div>
      ) : ( */}
        <PlaceILikeCardsWithComments
          restaurants={restaurants}
        />
      {/* )} */}
    </main>
  );
};

export default PlacesILike;