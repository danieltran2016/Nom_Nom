import React from "react";
import { useQuery } from "@apollo/client";

import { PlaceIDontLikeCardsWithComments } from "../components/PlaceCardsWithComments";

import { GET_PLACESIDONTLIKE } from "../utils/queries";

const PlacesIDontLike = () => {
  const { loading, data } = useQuery(GET_PLACESIDONTLIKE);
  const restaurants = data?.getPlacesIDontLike.restaurants || [];

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <PlaceIDontLikeCardsWithComments restaurants={restaurants} />
      )}
    </main>
  );
};

export default PlacesIDontLike;
