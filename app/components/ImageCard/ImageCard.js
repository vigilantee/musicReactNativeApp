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
import { MUSIC_AUTH_TOKEN, MUSIC_API_BASE, MUSIC_RESOLVE, MUSIC_RESOLVE_SUFFIX } from '../../constants'
import MusicPlayer from './musicPlayer';

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing: false,
      data: [],
      query: '',
      page: 1,
      currentMusic: '',
      currentTitle: '',
      playing: false
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

async resolveMusic(id='5a92249624a0f505728b98bb'){
  apiUrl = `${MUSIC_API_BASE}${MUSIC_RESOLVE}${id}${MUSIC_RESOLVE_SUFFIX}`
  user_token = MUSIC_AUTH_TOKEN
  try {
  const response  = await fetch(apiUrl, {
    method: 'GET', 
    headers: {
        'Authorization': MUSIC_AUTH_TOKEN
      }, 
    });
  const responseJson = await response.json();
  this.setState({currentMusic: responseJson.data})
  // ReactNativeAudioStreaming.play(responseJson.data, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
  this.setState({currentMusic:responseJson.data})
  console.log('ye aaya promise aur resolve ho gya........', responseJson.data)
  return responseJson.data;
  } catch(error) {
    console.error(error);
  }
}

  playMusic = (index) => {
    console.log('oh bc aa gya....', index);
    this.setState({currentTitle:this.props.titleList[index], playing:true});
    const resp = this.resolveMusic(this.props.idList[index]);
    console.log('response aa gya aur ye resp hai ye...........', resp);
  }

  stopMusic = () => {
    console.log('aaya bhai stop me.....')
    this.setState({playing:false})
  }

  _renderItem = (url, i) => {
    if(i%3===0)
      this.row+=1;
    const index=this.row*3 + i;
    return (
      <TouchableOpacity size={30} style={[styles.col, {flex: 1,height: 160,margin: 1}]} key={i} onPress={()=>this.playMusic(index)}>
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
    // const def='https://mosaic-nativebyte-in.s3.ap-south-1.amazonaws.com/music/04%20Meher%20Hai%20Rab%20Di%20-%20Mika%20320Kbps.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIEJOLVITN7HILT5A%2F20180729%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20180729T071242Z&X-Amz-Expires=3600&X-Amz-Signature=77545cee4fca0cad3543f4e70b12ac4bd500d2c0768d78e03b94a366d6c7666e&X-Amz-SignedHeaders=host'
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
        {
          this.state.currentMusic !== '' && this.state.playing &&
          <View>
            <MusicPlayer title={this.state.currentTitle} url={this.state.currentMusic} stopMusic={this.stopMusic}/>
          </View>
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
    titleList: state.searchMusic.titleList,
    idList: state.searchMusic.idList
  };
 }
 
 const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: login,
    searchMusic: searchMusic
  }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Card);

