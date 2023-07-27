import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';

import Auth from '../utils/auth';

const FormTemplate = ({mutation, query}) => {
  const [formState, setFormState] = useState({
    name: '',
    address: '',
  });

  // Set up our mutation with an option to handle errors
  const [mutate, { error }] = useMutation(mutation, {
    refetchQueries: [{ query: query }],
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // On form submit, perform mutation and pass in form data object as arguments
    try {
     await mutate({
        variables: { ...formState },
      });

      // window.location.reload();
      setFormState({
        name: '',
        address: '',
      });
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
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="formName">
          <Form.Control
            type="text"
            name="name"
            placeholder="Restaurant Name..."
            value={formState.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Control
            as="textarea"
            name="address"
            placeholder="Restaurant Address..."
            value={formState.address}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="warning" type="submit">
          Add
        </Button>
        {error && (
          <div className="my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </Form>
    </div>
  );
};

export default FormTemplate;