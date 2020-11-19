// import {
//   createHttpLink,
//   InMemoryCache,
//   ApolloClient
// } from '@apollo/react-hooks'
// import { setContext } from 'apollo-link-context'
// import fetch from 'isomorphic-fetch'
// import { withApollo } from 'next-apollo'

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

// const token = ''
// const userId = ''

// const authLink = setContext((_, { headers }) =>
//   // return the headers to the context so httpLink can read them
//   ({
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//       userid: userId
//     }
//   })
// )

// const httLink = new createHttpLink({
//   uri: `${API_URL}/graphql`,
//   fetch, // Server URL (must be absolute)
//   credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
// })

// const apolloClient = new ApolloClient({
//   ssrMode: typeof window === 'undefined',
//   link: authLink.concat(httLink),
//   cache: new InMemoryCache()
// })

// export default withApollo(apolloClient)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import fetch from 'isomorphic-fetch'
import jwt from 'jsonwebtoken'
import { useAuth } from '../context/AuthProvider'
import { onError } from "@apollo/client/link/error";

const initApolloClient = (initialState = {}, token, setAuthToken) => {
  const cache = new InMemoryCache().restore(initialState)

  const httpLink = createHttpLink({
    uri: `${API_URL}/graphql`,
    fetch,
    credentials: 'same-origin'
  })

  const authLink = setContext((_, { headers }) =>
    // return the headers to the context so httpLink can read them
    ({
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : ''
      }
    })
  )

  const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
  
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  // const refreshLink = new TokenRefreshLink({
  //   accessTokenField: 'newToken',
  //   // No need to refresh if token exists and is still valid
  //   isTokenValidOrUndefined: () => {
  //     // No need to refresh if we don't have a userId
  //     // No need to refresh if token exists and is valid
  //     if (token && jwt.decode(token)?.exp * 1000 > Date.now()) {
  //       return true
  //     }
  //   },
  //   fetchAccessToken: async () => {
  //     //Use fetch to access the refreshUserToken mutation
  //     const response = await fetch(`${API_URL}/graphql`, {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         query: `query { me {
  //                   username,
  //                   email,
  //                   id,
  //                   confirmed
  //                 }}`
  //       })
  //     })
  //     return response.json()
  //   },
  //   handleFetch: newToken => {
  //     // save new authentication token to state
  //     console.log('mew token', newToken)
  //     setAuthToken(newToken)
  //   },
  //   handleResponse: (operation, accessTokenField) => response => {
  //     console.log(response)
  //     if (response.errors.length > 0) return { newToken: null }
  //     return { newToken: null }
  //   },
  //   handleError: error => {
  //     console.error('Cannot refresh access token:', error)
  //   }
  // })

  const client = new ApolloClient({
    ssrMode: true,
    link: authLink.concat(onErrorLink).concat(httpLink),
    cache
  })
  return client
}

const withApollo = PageComponent => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const { authState, setAuthToken } = useAuth()

    const client =
      apolloClient ||
      initApolloClient(apolloState, authState.token, setAuthToken)

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  return WithApollo
}

export default withApollo
