import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Form, Col, Row, Button, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

// import { searchGooglePlaces, searchGeolocation } from '../utils/API';


const Header = () => {
  // create state for holding our search field data
  const [formState, setFormState] = useState({
    name: '',
    zipcode: '',
  }); 

  // const [restaurantName, setrestaurantName] = useState('');
  // const [restaurantAddress, setrestaurantAddress] = useState('');
  // const [restuarantRating, setrestuarantRating] = useState('');

  // set modal display state
  const [showModal, setShowModal] = useState(false);

  //const [searchedZip, setSearchedZip] = useState('');//initialize it as a string 

  // create method to search for restaurants and set state on form submit
  const handleFormSubmit = async (event) => { 
    event.preventDefault(); 


    if (!formState.zipcode) { 
      return false; 
    } 
 
    try {
      console.log("handle form submit revieced")
      console.log("name:",formState.name)
      console.log("zip:", formState.zipcode)
    //   const response = await searchGeolocation(formState.zipcode);

    //   if (!response.ok) {
    //     throw new Error('something went wrong!');
    //   }

    //   const { results } = await response.json();

    //   //searchgoogleplaces here

    //   const googleResponse = await searchGooglePlaces(
    //     `${results[0].geometry.location.lat},${results[0].geometry.location.lng}`, formState.name)

    //     const data = await googleResponse.json();

    //   setrestaurantName = data.results[0].name;
    //   setrestaurantAddress = data.results[0].formatted_address;
    //   setrestuarantRating = data.results[0].rating;
      
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
      <header className='bg-dark text-light mb-1 py-4 flex-row align-items-center'>
        <div className='container-fluid'>
          <div className='row justify-space-between-lg justify-center align-items-center'>
            <Link className='col-3 text-decoration-none' to="/">
              <h1 className='text-warning'>Nom Nom?</h1>
            </Link>
            <div className='col-9'>
              <Form onSubmit={handleFormSubmit}>
                <Row className='align-items-center'>
                  <Col xs={12} md={6}>
                    <Form.Control
                      name='name'
                      value={formState.name}
                      onChange={handleChange}
                      type='text'
                      size='lg'
                      placeholder='Name...'
                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <Form.Control
                      name='zipcode'
                      value={formState.zipcode}
                      onChange={handleChange}
                      type='text'
                      size='lg'
                      placeholder='Zipcode...'
                    />
                  </Col>
                  <Col xs={12} md={2} className='text-center'>
                    <Button
                      className='w-100 bg-warning text-dark text-truncate'
                      type='submit'
                      variant='warning'
                      size='lg'
                    >
                      Search
                    </Button>
                  </Col>
                  <Col xs={12} md={3} className='text-md-right mt-3 mt-md-0'>
                    {Auth.loggedIn() ? (
                      <Link className='text-warning' onClick={Auth.logout}>
                        Logout
                      </Link>
                    ) : (
                      <Link
                        className='text-warning'
                        onClick={() => setShowModal(true)}
                      >
                        Login/Sign Up
                      </Link>
                    )}
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </header>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header className='bg-warning' closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='tabs'>
                <Nav.Item>
                  <Nav.Link eventKey='login' className='text-dark'>
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup' className='text-dark'>
                    Sign Up
                  </Nav.Link>
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