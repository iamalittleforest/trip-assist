// import react dependencies
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import apollo dependencies
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import chakra dependencies
import { ChakraProvider } from '@chakra-ui/react';

// import pages
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Footer from './components/Footer';

// create main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// create request middleware
const authLink = setContext((_, { headers }) => {

  // get the token from local storage 
  const token = localStorage.getItem('id_token');

  // return the headers to the context
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// create Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <SignupForm />
        <LoginForm />
        <Footer />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;