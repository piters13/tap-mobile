import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TaskListItem } from '../components/task-list-item.component'
import { Colors } from '../constants/colors'

export class Header extends React.Component {
  render () {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>
          Tasks
        </Text>
        <Text style={{fontSize: 10, color: 'black'}}>
          Updated 5 minutes ago
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    width: 250,
    paddingBottom: 15,
    paddingTop: 40
  },
  headerTextStyle: {
    textAlign: 'left',
    color: Colors.Main,
    fontWeight: '400',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Arial, Helvetica, sansSerif',
    paddingTop: 10
  }
})
