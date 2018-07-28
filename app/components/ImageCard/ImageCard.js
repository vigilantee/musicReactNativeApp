import React, { Component } from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import SearchBar from 'react-native-searchbar';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import getSearchResultsFromAPI from '../../actions/searchImage';
import login from '../../actions/login';
import searchMusic from '../../actions/searchMusic';

import styles from './styles';
import { Row, Column as Col, Grid} from 'react-native-responsive-grid'

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
    },()=>this.props.searchMusic());
  }

  colInjector = (url) => {
    return (
      <Col size={30} style={styles.col}>
        <Image
          style={styles.image}
          source={{uri: url}}
        />
      </Col>
    )
  }

  rowInjector = (item,index) => {
    let url = item.assets.preview.url;
    if(index%3 != 0)
      return;
    return(<Row key={item.key} style={styles.row}>
      {this.colInjector(this.props.urlList[index])}
      {this.colInjector(this.props.urlList[index+1])}
      {this.colInjector(this.props.urlList[index+2])}
    </Row>
    )
  }

  render() {
    return (
      <View>
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
        {this.props.searchImage.length > 5 && <FlatList
          data={this.props.searchImage}
          initialNumToRender={12}
          renderItem={
            ({ item, index }) => {
              return(this.rowInjector(item,index))
            }}
        />}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    searchImage: state.searchImage.allSearchResults,
    // urlList: state.searchImage.urlList,
    searchMusic: state.searchMusic.allSearchResults,
    urlList: state.searchMusic.labelList
  };
 }
 
 const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    // getSearchResultsFromAPI: getSearchResultsFromAPI,
    login: login,
    searchMusic: searchMusic
  }, dispatch);
 }
 
 export default connect(mapStateToProps,matchDispatchToProps)(Card);
