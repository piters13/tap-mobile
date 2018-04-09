import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { TaskListItem } from '../components/task-list-item.component'
import taskListMock from '../data/task-list-mock.data'

export class TaskList extends React.Component {
  render () {
    return (
      <View style={styles.listStyle}>
        <FlatList data={taskListMock} renderItem={({item, index, style}) => (
          <View>
            <TaskListItem item={item} index={index} style={styles.listItemStyle} />
          </View>
        )} keyExtractor={item => item.subtitle} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listStyle: {
    maxHeight: '60%'
  },
  listItemStyle: {
    flex: 1,
    margin: 5,
    width: 250,
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  }
})
