import React from 'react';

import FormTemplate from './SideAddFormTemplate';
import { ADDTO_PLACESTOGO, ADDTO_PLACESILIKE, ADDTO_PLACESIDONTLIKE } from '../utils/mutations';

const PlacesToGoForm = () => {
  return (
    <FormTemplate mutation={ADDTO_PLACESTOGO} />
  );
};

const PlacesILikeForm = () => {
  return (
    <FormTemplate mutation={ADDTO_PLACESILIKE} />
  );
};

const PlacesIDontLikeForm = () => {
  return (
    <FormTemplate mutation={ADDTO_PLACESIDONTLIKE} />
  );
};

export { PlacesToGoForm, PlacesILikeForm, PlacesIDontLikeForm };
