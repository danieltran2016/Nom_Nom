import React from 'react';

import FormTemplate from './SideAddFormTemplate';
import { ADDTO_PLACESTOGO, ADDTO_PLACESILIKE, ADDTO_PLACESIDONTLIKE } from '../utils/mutations';
import { GET_PLACESTOGO, GET_PLACESILIKE, GET_PLACESIDONTLIKE } from '../utils/queries';
import { getPlacesToGo, getPlacesILike, getPlacesIDontLike } from '../utils/queries';


const PlacesToGoForm = () => {
  return (
    <FormTemplate mutation={ADDTO_PLACESTOGO} query={GET_PLACESTOGO} queryFunction={getPlacesToGo} />
  );
};

const PlacesILikeForm = () => {
  return (
    <FormTemplate mutation={ADDTO_PLACESILIKE} query={GET_PLACESILIKE} queryFunction={getPlacesILike} />
  );
};

const PlacesIDontLikeForm = () => {
  return (
    <FormTemplate mutation={ADDTO_PLACESIDONTLIKE} query={GET_PLACESIDONTLIKE} queryFunction={getPlacesIDontLike} />
  );
};

export { PlacesToGoForm, PlacesILikeForm, PlacesIDontLikeForm };
