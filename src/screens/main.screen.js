import React from 'react';
import { Button, StyleSheet, Text, View, FlatList, TouchableHighlight} from 'react-native';
import { Avatar } from "react-native-elements";
import { inject, observer } from 'mobx-react';
import { Screens } from '../constants/screens';
import data from '../data/tempData';

class MyListItem extends React.Component {
  render(){
    return (
      <View style={{flex:1, margin:10, width: 250, borderBottomWidth: 1}}>
        <Text style={{fontWeight: "bold"}}>{this.props.item.name}</Text>
        <Text>{this.props.item.subtitle}</Text>
      </View>
    );
  }
}

class MyList extends React.Component {
  render(){
    return(
      <FlatList
            data={data}
            renderItem={({item, index}) => (
                <MyListItem item={item} index={index}>
                </MyListItem>
            )}
            keyExtractor={item => item.avatar_url}
          />
    );
  }
}

@inject('Auth') @observer
export class MainScreen extends React.Component {

  render() {
    return (
        <View style={styles.container}>
          <View style={{width:250, paddingBottom: 15}}>
            <Text style={styles.headerText}>Tasks</Text>
            <Text style={{fontSize: 10, color: 'black'}}>Updated 5 minutes ago</Text>
          </View>
          <MyList style={{height: 100}}/>
          <TouchableHighlight style={styles.addButton}
              underlayColor='#0d8193' onPress={() => this.logout()}>
              <Text style={{fontSize: 40, color: 'white'}}>+</Text>
          </TouchableHighlight>
        </View>
    );
  }

  logout() {
    this.props.navigator.resetTo({
      screen: Screens.Login.screen,
    });

    this.props.Auth.logout();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  headerText: {
    textAlign: 'left',
    color: '#1ca3b9',
    fontWeight: "400",
    fontSize: 50,
    fontFamily: 'Arial, Helvetica, sansSerif',
    paddingTop: 10
  },
  addButton: {
    backgroundColor: '#1ca3b9',
    height: 70,
    width: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
});
