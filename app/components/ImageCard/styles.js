import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({
    row : {
        paddingTop: '6%',
        paddingBottom: '6%',
        paddingLeft:'6%',
        backgroundColor: '#d3d3d3',
        height: 160
    },
    col : {
        marginRight: 10,
        marginBottom: 10
    },
  header : {
      height: 60,
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  item: {
    flex: 1,
    height: 160,
    margin: 1
  },
  list: {
    flex: 1
  },
  image : {
    width : 116,
    height: 140
  },
  icon : {
    color: '#000000',
    fontWeight: 'bold',
    paddingRight: 25
    }
});
