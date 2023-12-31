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

import backgroundImage from '../src/image/background.jpg';
import { FaGithub } from 'react-icons/fa';

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
          <div
            className="container-fluid"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              minHeight: '100vh',
            }}
          >
            <div className="row">
              <div className="col-12 col-md-3 order-md-1 order-2 bg-dark">
                <SideNavbar />
              </div>
              <div className="col-12 col-md-9 order-md-2 order-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/PlacesToGo" element={<PlacesToGo />} />
                  <Route path="/PlacesILike" element={<PlacesIlike />} />
                  <Route path="/PlacesIDontLike" element={<PlacesIDontlike />} />
                  <Route path="/Search" element={<SearchPlaces />} />
                  <Route path="/SideNavbar" element={<SideNavbar />} />
                  <Route
                    path="*"
                    element={<h1 className="display-2">Wrong page!</h1>}
                  />
                </Routes>
              </div>
            </div>
            <h3 style={{ textAlign: 'center'}}>
              <a href="https://github.com/xybai0103" 
                 class='text-dark'
                 style={{ textDecoration: 'none', marginRight: '20px' }}>
                Xueyin <FaGithub />
              </a>
              <a href="https://github.com/Willyum863"
                 class='text-warning'
                 style={{ textDecoration: 'none', marginRight: '20px'}}>
                William <FaGithub />
              </a>
              <a href="https://github.com/danieltran2016"
                 class='text-secondary'
                 style={{ textDecoration: 'none' }}>
                Danny <FaGithub />
              </a>
            </h3>
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
