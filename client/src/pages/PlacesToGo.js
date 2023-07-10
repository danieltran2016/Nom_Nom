import React from "react";
import { useQuery } from "@apollo/client";

import PlaceCardsWithoutComments from "../components/PlaceCardsWithoutComments";

import { GET_PLACESTOGO } from "../utils/queries";

const PlacesToGo = () => {
  const { loading, error, data } = useQuery(GET_PLACESTOGO);
  //console.log("data:", data);
  const restaurants = data?.getPlacesToGo.restaurants || [];

  // if (loading) {
  //   return <h1>Loading ...</h1>;
  // }
  // if (error) {
  //   console.error("Error:", error);
  //   return <div>Error occurred while fetching data.</div>;
  // }

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
      <PlaceCardsWithoutComments restaurants={restaurants} />
      )}
    </main>
  );
};

export default PlacesToGo;
