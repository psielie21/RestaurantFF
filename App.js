import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { ApolloProvider } from 'react-apollo';
import ConnectionConstants, { development } from "./constants/Connection"

import { ApolloClient } from 'apollo-client';
import ApolloLinkTimeout from 'apollo-link-timeout';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { onError } from 'apollo-link-error';
import { createUploadLink }  from 'apollo-upload-client';


import { createStore } from "redux";
import { Provider } from "react-redux";



import rootReducer from "./reducers/user"
import RootNavigation from "./navigation/RootNavigation"

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      restaurant: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Restaurant', id: args.id })
    },
  },
});


const httpLink = createUploadLink({
  uri: ConnectionConstants.graphql,
});

const authLink = setContext( async(_, { headers }) => {
  const token = await AsyncStorage.getItem('@restauranttoken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      updateActiveRestaurant: (_, { name }, { cache }) => {
        console.log(cache);
        const data = {
          activeRestaurant: {
            __typename: 'Restaurant',
            name
          },
        };
        cache.writeData({ data });
        return null;
      },
    },
    Query: {
      getActualRestaurants: (_, args, { cache }) => {
        return cache;
      }
    },
  }
});

const timeoutLink = new ApolloLinkTimeout(10000); // 10 second timeout

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    stateLink,
    authLink,
    timeoutLink.concat(httpLink),
  ]),
  cache
});

const store = createStore(rootReducer)

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (


            <ApolloProvider client={client} >
              <Provider store={store}>
              <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <RootNavigation />
                </View>
              </Provider>
            </ApolloProvider>



      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
