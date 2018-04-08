import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { TaskListItem } from '../components/task-list-item.component';
import taskListMock from '../data/taskListMock.data';

export class ToDoList extends React.Component {
    render(){
      return(
        <View style={styles.listStyle}>
          <FlatList
            data={taskListMock}
            renderItem={({item, index}) => (
              <TaskListItem item={item} index={index}/>
            )}
            keyExtractor={item => item.subtitle}
          />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    listStyle: {
      maxHeight: '60%'
    }
});