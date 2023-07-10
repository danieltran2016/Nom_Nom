// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Col,
//   Form,
//   Button,
//   Card,
//   Row
// } from 'react-bootstrap';

// import { searchGooglePlaces, searchGeolocation } from '../utils/API';

// const SearchZip = () => {
//   // create state for holding returned google api data
//   const [searchedZip, setSearchedZip] = useState([]);
//   // create state for holding our search field data
//   const [searchInput, setSearchInput] = useState('');

//   const handleFormSubmit = async (event) => { 
//     event.preventDefault(); 

//     if (!formstate.zipcode) { 
//       return false; 
//     } 
 
//     try {
//       const response = await searchGeolocation(formstate.zipcode);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       const { items } = await response.json();

//       const geoData = items((geo) => ({
//         lat: geo.result.geometry.location.lat,
//         lng: geo.result.geometry.location.lng
//       }));

//       setSearchedZip(geoData);
//       setSearchInput('');
//     } catch (err) {
//       console.error(err);
//     }
//   };



//   return (
//     <>
//       <div className="text-light bg-dark p-5">
//         <Container>
//           <h1>Search for Books!</h1>
//           <Form onSubmit={handleFormSubmit}>
//             <Row>
//               <Col xs={12} md={8}>
//                 <Form.Control
//                   name='searchInput'
//                   value={searchInput}
//                   onChange={(e) => setSearchInput(e.target.value)}
//                   type='text'
//                   size='lg'
//                   placeholder='Search for a book'
//                 />
//               </Col>
//               <Col xs={12} md={4}>
//                 <Button type='submit' variant='success' size='lg'>
//                   Submit Search
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </Container>
//       </div>

//       <Container>
//         <h2 className='pt-5'>
//           {searchedBooks.length
//             ? `Viewing ${searchedBooks.length} results:`
//             : 'Search for a book to begin'}
//         </h2>
//         <Row>
//           {searchedBooks.map((book) => {
//             return (
//               <Col md="4">
//                 <Card key={book.bookId} border='dark'>
//                   {book.image ? (
//                     <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
//                   ) : null}
//                   <Card.Body>
//                     <Card.Title>{book.title}</Card.Title>
//                     <p className='small'>Authors: {book.authors}</p>
//                     <Card.Text>{book.description}</Card.Text>
//                     {Auth.loggedIn() && (
//                       <Button
//                         disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
//                         className='btn-block btn-info'
//                         onClick={() => handleSaveBook(book.bookId)}>
//                         {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
//                           ? 'This book has already been saved!'
//                           : 'Save this Book!'}
//                       </Button>
//                     )}
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SearchZip;
