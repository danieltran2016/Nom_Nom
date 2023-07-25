import React from 'react';

import FormTemplate from './SideAddFormTemplate';
import { ADDTO_PLACESTOGO, ADDTO_PLACESILIKE, ADDTO_PLACESIDONTLIKE } from '../utils/mutations';
import { GET_PLACESTOGO, GET_PLACESILIKE, GET_PLACESIDONTLIKE } from '../utils/queries';


const PlacesToGoForm = () => {
  return (
    <FormTemplate mutation={ADDTO_PLACESTOGO} query={GET_PLACESTOGO} />
  );
};

const PlacesILikeForm = () => {
  return (
    <FormTemplate mutation={ADDTO_PLACESILIKE} query={GET_PLACESILIKE} />
  );
};

const PlacesIDontLikeForm = () => {
  return (
    <FormTemplate mutation={ADDTO_PLACESIDONTLIKE} query={GET_PLACESIDONTLIKE} />
  );
};

export { PlacesToGoForm, PlacesILikeForm, PlacesIDontLikeForm };
