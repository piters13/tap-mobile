import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { TaskListItem } from '../components/task-list-item.component'

export class TaskList extends React.Component {
  render () {
    return (
      <View style={this.props.style}>
        {this.renderSeparator()}
        <FlatList data={this.props.tasks} ItemSeparatorComponent={this.renderSeparator}
          renderItem={({item, index}) => (
            <View>
              <TaskListItem item={item} index={index} style={styles.listItemStyle} />
            </View>
          )} keyExtractor={item => item.subtitle} />
        {this.renderSeparator()}
      </View>
    )
  }

  renderSeparator () {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#f3f4f6'
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  listItemStyle: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
  }
})
