import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import taskListMock from '../data/taskListMock.data';

export class TaskListItem extends React.Component {
  render(){
    return (
      <View style={styles.listItemStyle}>
        <Text style={{fontWeight: "bold", fontSize: 20}}>{this.props.item.name}</Text>
        <Text style={{paddingBottom: 10}}>{this.props.item.subtitle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemStyle : {
    flex:1,
    margin: 5,
    width: 250,
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  }
});