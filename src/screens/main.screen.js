import React from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { Avatar } from "react-native-elements";
import { inject, observer } from 'mobx-react';
import { Screens } from '../constants/screens';
import data from '../data/tempData';

class MyListItem extends React.Component {
  render(){
    return (
      <View style={{flex:1, margin:10, width: 250, borderBottomWidth: 1,}}>
        <Text style={{fontWeight: "bold"}}>{this.props.item.name}</Text>
        <Text>{this.props.item.subtitle}</Text>
      </View>
    );
  }
}

@inject('Auth') @observer
export class MainScreen extends React.Component {

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.headerText}>Tasks</Text>
          <Text style={styles.lowerHeader}>Updated 5 minutes ago</Text>
          <FlatList
            data={data}
            renderItem={({item, index}) => (
                <MyListItem item={item} index={index}>
                </MyListItem>
            )}
            keyExtractor={item => item.avatar_url}
          />
          <Button onPress={() => this.logout()} title="Logout"/>
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
    color: '#1ca3b9',
    fontWeight: "400",
    fontSize: 50,
    fontFamily: 'Arial, Helvetica, sansSerif',
    padding: 10
  },
  lowerHeader: {
    fontSize: 15
  }
});
