import React from 'react';
import { View, Text, TextInput } from 'react-native';
import {
  connectSearchBox,
  connectHits,
  connectHighlight,
} from 'react-instantsearch-native';

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => (
  <TextInput
    onChangeText={refine}
    placeholder="iPhone XS MAX"
    value={currentRefinement}
    style={{
      flex: 1,
      backgroundColor: 'white',
      height: 50,
      padding: 10,
    }}
  />
));

const Highlight = connectHighlight(({ highlight, attribute, hit }) => {
  const highlights = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });

  return (
    <Text>
      {highlights.map((highlight, index) => (
        <Text
          key={`${highlight.value}-${index}`}
          style={{
            backgroundColor: highlight.isHighlighted ? 'yellow' : 'transparent',
          }}
        >
          {highlight.value}
        </Text>
      ))}
    </Text>
  );
});

const Hits = connectHits(({ hits }) => (
  <View>
    {hits.map(hit => (
      <View key={hit.objectID}>
        <Highlight attribute="name" hit={hit} />
      </View>
    ))}
  </View>
));

class Home extends React.Component {
  static navigationOptions = {
    headerTitle: <SearchBox />,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Hits />
      </View>
    );
  }
}

export default Home;
