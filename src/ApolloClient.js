import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { AUTH_TOKEN } from './constants'
import { ApolloLink, split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: 'ws://192.168.1.185:4000',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    }
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLinkWithAuthToken,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client