import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { InstantSearch, Configure } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch/lite';
import Home from './src/Home';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const Router = createStackNavigator({
  Home: {
    screen: Home,
  },
});

export default class App extends React.Component {
  root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
  };

  state = {
    searchState: {},
  };

  onSearchStateChange = searchState =>
    this.setState({
      searchState,
    });

  render() {
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName="instant_search"
        searchState={this.state.searchState}
        onSearchStateChange={this.onSearchStateChange}
        root={this.root}
      >
        <Configure hitsPerPage={5} />
        <Router />
      </InstantSearch>
    );
  }
}
