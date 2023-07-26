import React from 'react';

import FormTemplate from './SideAddFormTemplate';
import { ADDTO_PLACESTOGO, ADDTO_PLACESILIKE, ADDTO_PLACESIDONTLIKE } from '../utils/mutations';
import { GET_PLACESTOGO, GET_PLACESILIKE, GET_PLACESIDONTLIKE } from '../utils/queries';
//import { getPlacesToGo, getPlacesILike, getPlacesIDontLike } from '../utils/queries';


const PlacesToGoForm = () => {
  return (
    <FormTemplate mutation={ADDTO_PLACESTOGO} mutationReturnName={"addToPlacesToGo"} query={GET_PLACESTOGO} queryReturnName={"getPlacesToGo"} />
  );
};

const PlacesILikeForm = () => {
  return (
    <FormTemplate mutation={ADDTO_PLACESILIKE} mutationReturnName={"addToPlacesILike"} query={GET_PLACESILIKE} queryReturnName={"getPlacesILike"} />
  );
};

const PlacesIDontLikeForm = () => {
  return (
    <FormTemplate mutation={ADDTO_PLACESIDONTLIKE} mutationReturnName={"addToPlacesIDontLike"} query={GET_PLACESIDONTLIKE} queryReturnName={"getPlacesIDontLike"} />
  );
};

export { PlacesToGoForm, PlacesILikeForm, PlacesIDontLikeForm };
