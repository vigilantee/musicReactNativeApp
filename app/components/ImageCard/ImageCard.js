import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import SearchBar from 'react-native-searchbar';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import login from '../../actions/login';
import searchMusic from '../../actions/searchMusic';

import styles from './styles';
import Grid from 'react-native-grid-component';

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing: false,
      data: [],
      query: '',
      page: 1
    }
    this.props.searchMusic();
  };


  _handleResults = (results) => {
    this.setState({
      query: results,
      page: 1
    },()=>this.props.searchMusic(results));
  }

  colInjector = (url, i) => {
    console.log('meri maa ne bandha dora $$$$$$$$$$$$$$$$$$', url);
    return (
      <View size={30} style={[styles.col, {flex: 1,height: 160,margin: 1}]} key={i}>
        <Image
          style={styles.image}
          source={url==='default'?require('../../assets/default.jpg'):{uri: url}}
        />
      </View>
    )
  }
  _renderPlaceholder = i => <View style={styles.item} key={i} />;
  _renderItem = (data, i) => (
    <View style={[{ backgroundColor: '#ff0000' },{flex: 1,height: 160,margin: 1}]} key={i} />
  );

  render() {
    console.log('oh bc aa gya....', this.props.urlList)
    return (
      <View style={{paddingBottom:30, flex:1}}>
        <View style={styles.header}>
          <SearchBar
              ref={(ref) => this.searchBar = ref}
              style={{ height: 30, width: 330 }}
              icon = {{type: 'material-community', color: '#86939e', name: 'share' }}
              focusOnLayout={true}
              placeholder="Search..."
              handleSearch={this._handleResults}
            />
          <TouchableOpacity onPress={() => this.searchBar.show()}>
            <Icon name={"search"} size ={27} style = {styles.icon}/>
          </TouchableOpacity>
        </View>
        {this.props.urlList.length > 0 &&
        <Grid
        style={{flex: 1}}
        renderItem={this.colInjector}
        data={this.props.urlList}
        itemsPerRow={3}
        renderPlaceholder={this._renderPlaceholder}
        />
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    searchImage: state.searchImage.allSearchResults,
    searchMusic: state.searchMusic.allSearchResults,
    urlList: state.searchMusic.labelList
  };
 }
 
 const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: login,
    searchMusic: searchMusic
  }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Card);
