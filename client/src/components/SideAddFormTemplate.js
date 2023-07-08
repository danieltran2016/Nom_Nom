import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';

const FormTemplate = ({mutation}) => {
  const [formState, setFormState] = useState({
    name: '',
    address: '',
  });

  // Set up our mutation with an option to handle errors
  const [mutate, { error }] = useMutation(mutation);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // On form submit, perform mutation and pass in form data object as arguments
    try {
      const { data } = mutate({
        variables: { ...formState },
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div>
      <form 
        className="flex-row justify-center justify-space-between-md align-center" 
        onSubmit={handleFormSubmit} 
      >
        <div className="col-12">
          <input
            name="name" 
            placeholder="Restaurant Name..."
            value={formState.name}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>
        <div className="col-12"> 
          <textarea
            name="address"
            placeholder="Restaurant Address..."
            value={formState.address}
            className="form-input w-100"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-12">
          <button className="btn btn-warning" type="submit">
            Add
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
};

export default FormTemplate;