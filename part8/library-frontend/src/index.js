import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationContextProvider } from './NotificationContext';
import { UserContextProvider } from './UserContext';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <Router>
      <UserContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </UserContextProvider>
    </Router>
  </ApolloProvider>
);
