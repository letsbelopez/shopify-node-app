import React, { Component } from 'react';
import { AppProvider } from '@shopify/polaris';
import Router from './components/Router';

class App extends Component {
  render() {
    const { apiKey, shopOrigin } = window;

    return (
      <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
        <Router />
      </AppProvider>
    );
  }
}

export default App;
