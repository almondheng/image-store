import fetch from 'node-fetch';
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';


const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:3030/graphql',
  fetch:fetch
});

const client = new ApolloClient({
  cache,
  link
});


module.exports = client
