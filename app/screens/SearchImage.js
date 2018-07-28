import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, Platform } from 'react-native';
import SearchBar from 'react-native-searchbar';

export default class SearchImage extends Component {
  render() {
    return (
      <View>
        <SearchBar
          ref={(ref) => this.searchBar = ref}
          showOnLoad
        />
      </View>
    )
  }
}
