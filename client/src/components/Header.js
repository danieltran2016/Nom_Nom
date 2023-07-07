import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Form, Col, Row, Button, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const Header = () => {
  // create state for holding our search field data
  const [formState, setFormState] = useState({
    name: '',
    zipcode: '',
  });
  
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  // create method to search for restaurants and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!formState) {
      return false;
    }

    try {
      // const response = await searchGoogleBooks(searchInput);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // const { items } = await response.json();

      // const restaurantData = items.map((book) => ({
      //   bookId: book.id,
      //   authors: book.volumeInfo.authors || ['No author to display'],
      //   title: book.volumeInfo.title,
      //   description: book.volumeInfo.description,
      //   image: book.volumeInfo.imageLinks?.thumbnail || '',
      // }));

      setFormState('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <>
      <header class="bg-dark text-light mb-4 py-3 flex-row align-center">
        <div class='container-fluid'>
          <div class="row justify-space-between-lg justify-center align-center">
            <h1 class="text-warning col-3">Nom Nom</h1>
            <div class='col-7'>
              <Form onSubmit={handleFormSubmit}>
                <Row>
                  <Col xs={12} md={8}>
                    <Form.Control
                      name='name'
                      value={formState.name}
                      onChange={handleChange}
                      type='text'
                      size='lg'
                      placeholder='Name...'
                    />
                    <Form.Control
                      name='zipcode'
                      value={formState.zipcode}
                      onChange={handleChange}
                      type='text'
                      size='lg'
                      placeholder='Zipcode...'
                    />
                  </Col>
                  <Col xs={12} md={4}>
                    <Button className="bg-secondary" type='submit' variant='success' size='lg'>
                      Submit Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
            <div class='col-2'>
              {Auth.loggedIn() ? (
                <Link class="text-warning" onClick={Auth.logout}>Logout</Link>
              ) : (
                <Link class="text-warning" onClick={() => setShowModal(true)}>Login/Sign Up</Link>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default Header;
