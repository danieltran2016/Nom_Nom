import React from 'react';
import { useQuery } from '@apollo/client';

import PlaceCardsWithoutComments from '../components/PlaceCardsWithoutComments';

import { GET_PLACESTOGO } from '../utils/queries'

const PlacesToGo = () => {
  const { loading, data } = useQuery(GET_PLACESTOGO);
  const restaurants = data?.restaurants || [];
  console.log('data:', data);
  console.log('restaurants:', restaurants);
  // const restaurants = [
  //   {
  //     name: 'Burgerking',
  //     address: '123',
  //   },
  //   {
  //     name: 'Burgerking',
  //     address: '456',
  //   },
  //   {
  //     name: 'Burgerking',
  //     address: '789',
  //   },
  // ];

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <PlaceCardsWithoutComments
          restaurants={restaurants}
        />
      )}
    </main>
  );
};

export default PlacesToGo;