import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlacesIlike from './pages/PlacesILike';
import PlacesIDontlike from './pages/PlacesIDontLike';
import PlacesToGo from './pages/PlacesToGo';
import SearchPlaces from './pages/SearchPlaces';
import Header from './components/Header';
import SideNavbar from './components/SideNavbar';
import Home from './pages/Home';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({ 
  uri: '/graphql', 
}); 

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Header />
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-3 bg-dark'>
                <SideNavbar />
              </div>
              <div className='col-9'>
                <Routes>
                <Route 
                    path='/' 
                    element={<Home />} 
                  />          
                  <Route 
                    path='/PlacesToGo' 
                    element={<PlacesToGo />} 
                  />
                  <Route 
                    path='/PlacesILike' 
                    element={<PlacesIlike />} 
                  />
                  <Route 
                    path='/PlacesIDontLike' 
                    element={<PlacesIDontlike />} 
                  />
                  <Route 
                    path='/Search' 
                    element={<SearchPlaces />} 
                  />
                  <Route 
                    path='*'
                    element={<h1 className='display-2'>Wrong page!</h1>}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
