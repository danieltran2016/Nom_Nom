import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Form, Col, Row, Button, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const Header = () => {
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // set modal display state
  const [showModal, setShowModal] = useState(false);

  // create method to search for restaurants and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
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

      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header className="bg-dark text-light mb-1 py-4 flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-3 col-12">
              <h1 className="text-warning">Nom Nom?</h1>
            </div>
            <div className="col-md-6 col-12 mt-3 mt-md-0">
              <Form onSubmit={handleFormSubmit}>
                <Row className="g-2">
                  <Col xs={8} md={9}>
                    <Form.Control
                      name="searchInput"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      type="text"
                      size="lg"
                      placeholder="Search for a restaurant"
                    />
                  </Col>
                  <Col xs={4} md={3}>
                    <Button
                      className="w-100 bg-secondary text-warning text-truncate"
                      type="submit"
                      variant="warning"
                      size="lg"
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
            <div className="col-md-3 col-12 mt-3 mt-md-0 text-end">
              {Auth.loggedIn() ? (
                <Link className="text-warning" onClick={Auth.logout}>
                  Logout
                </Link>
              ) : (
                <Link
                  className="text-warning"
                  onClick={() => setShowModal(true)}
                >
                  Login/Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header className="bg-warning" closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="tabs"> 
                <Nav.Item>
                  <Nav.Link eventKey="login" 
                            className="text-dark">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup" 
                            className="text-dark">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
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
