import React from 'react';
import { useQuery } from '@apollo/client';

import PlaceCardsWithoutComments from '../components/PlaceCardsWithoutComments';

import { GET_PLACESTOGO } from '../utils/queries'

const PlacesToGo = () => {
  const { loading, data } = useQuery(GET_PLACESTOGO);
  const restaurants = data?.getPlacesToGo.restaurants || [];

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