import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import client from './ApolloClient'
import '@shopify/polaris/styles.css';
import {AppProvider} from '@shopify/polaris';

ReactDOM.render(
  <AppProvider>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </AppProvider>
  ,
  document.getElementById('root'),
)
registerServiceWorker()