import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import ActionButton from 'react-native-action-button'
import { Colors } from '../constants/colors'

export class CreateTaskScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      taskName: '',
      tagName: ''
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.createTask}>Create task</Text>

        <TextInput placeholder='Task name'
          underlineColorAndroid='transparent'
          style={styles.input}
          onChangeText={(taskName) => this.setState({taskName})}
          value={this.state.taskName} />

        <Text style={styles.addTags}>Add some tags</Text>

        <TextInput placeholder='New tag'
          underlineColorAndroid='transparent'
          style={styles.input}
          onChangeText={(tagName) => this.setState({tagName})}
          value={this.state.tagName} />

        <ActionButton position='right' buttonColor={Colors.Main} onPress={() => this.createTag()} />
      </View>
    )
  }

  createTag () {

  }
}

const styles = StyleSheet.create({
  container: {
    height: '60%',
    width: '80%',
    borderRadius: 14,
    justifyContent: 'center',
    backgroundColor: '#101b31',
    top: 40,
    left: 40,
    right: 40,
    bottom: 40
  },
  input: {
    backgroundColor: '#CFD7DB',
    borderWidth: 0,
    marginLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 20,
    borderRadius: 14,
    color: '#333',
    fontSize: 14,
    marginBottom: 10,
    width: 270
  },
  createTask: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 20
  },
  addTags: {
    fontSize: 18,
    textAlign: 'left',
    color: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 20
  }
})
