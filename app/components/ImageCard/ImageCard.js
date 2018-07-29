import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text
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
    this.row = -1;
  };


  _handleResults = (results) => {
    this.setState({
      query: results,
      page: 1
    },()=>this.props.searchMusic(results));
  }

  playMusic = (index) => {
    console.log('oh bc aa gya....', index);
  }

  _renderItem = (url, i) => {
    if(i%3===0)
      this.row+=1;
    const index=this.row*3 + i;
    return (
      <TouchableOpacity size={30} style={[styles.col, {flex: 1,height: 160,margin: 1}]} key={i} onPress={()=>this.playMusic(i)}>
        <Image
          style={styles.image}
          source={url==='default'?require('../../assets/default.jpg'):{uri: url}}
        />
        <Text numberOfLines = { 1 } ellipsizeMode = 'middle'>{this.props.titleList[index]}</Text>
      </TouchableOpacity>
    )
  }
  _renderPlaceholder = i => <View style={styles.item} key={i} />;

  render() {
    console.log('oh bc aa gya....', this.props.titleList)
    this.row=-1;
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
        renderItem={this._renderItem}
        renderPlaceholder={this._renderPlaceholder}
        data={this.props.urlList}
        itemsPerRow={3}
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
    urlList: state.searchMusic.labelList,
    titleList: state.searchMusic.titleList
  };
 }
 
 const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: login,
    searchMusic: searchMusic
  }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Card);
