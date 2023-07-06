import React from 'react';
import { useQuery } from '@apollo/client';

import PlaceCardsWithoutComments from '../components/PlaceCardsWithoutComments';

import { GET_PLACESTOGO } from '../utils/queries'

const PlacesToGo = () => {
  const { loading, data } = useQuery(GET_PLACESTOGO);
  const placesToGo = data?.getPlacesToGo.restaurants || [];

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <PlaceCardsWithoutComments
          placesToGo={placesToGo}
        />
      )}
    </main>
  );
};

export default PlacesToGo;