import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { TaskListItem } from '../components/task-list-item.component'
import taskListMock from '../data/task-list-mock.data'

export class TaskList extends React.Component {
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: 250,
          backgroundColor: '#e1e6e9'
        }}
      />
    )
  }

  render () {
    return (
      <View style={styles.listStyle}>
        <FlatList data={taskListMock} ItemSeparatorComponent={this.renderSeparator}
                  renderItem={({item, index}) => (
                    <View>
                      <TaskListItem item={item} index={index} style={styles.listItemStyle}/>
                    </View>
                  )} keyExtractor={item => item.subtitle}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listStyle: {
    maxHeight: '53%'
  },
  listItemStyle: {
    flex: 1,
    margin: 5
  }
})
