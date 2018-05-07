import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { TaskListItem } from '../components/task-list-item.component'
import { Separator } from '../components/separator.component'

export class TaskList extends React.Component {
  render () {
    return (
      <View style={this.props.style}>
        <Separator />
        <FlatList data={this.props.tasks} ItemSeparatorComponent={Separator}
          renderItem={({item, index}) => (
            <View>
              <TaskListItem item={item} index={index} style={styles.listItemStyle} />
            </View>
          )} keyExtractor={item => item.id} />
        <Separator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
  }
})
