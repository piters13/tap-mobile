import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import ActionButton from 'react-native-action-button'
import { Colors } from '../constants/colors'
import { TagList } from '../components/tag-list.component'
import { tagListMock } from '../data/tag-list-mock'

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
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.createTask}>Create task</Text>

          <TextInput placeholder='Task name'
            underlineColorAndroid='transparent'
            style={styles.input}
            onChangeText={(taskName) => this.setState({taskName})}
            value={this.state.taskName} />

          <Text style={styles.addTags}>Add some tags</Text>

          <TagList tags={tagListMock} style={{width: 260, flex: 1}} />

          <TextInput placeholder='New tag'
            underlineColorAndroid='transparent'
            style={styles.newTagInput}
            onChangeText={(tagName) => this.setState({tagName})}
            value={this.state.tagName} />

          <ActionButton style={styles.addTagButton} buttonColor={Colors.Primary} onPress={() => this.createTag()} />
          <TouchableOpacity style={styles.button} onPress={() => this.createTask()}>
            <Text style={styles.buttonText}> Add </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  createTag () {
  }

  createTask () {
  }
}

const styles = StyleSheet.create({
  container: {
    height: '70%',
    width: '80%',
    borderRadius: 14,
    justifyContent: 'center',
    backgroundColor: Colors.DarkGrey,
    top: 60,
    left: 40,
    right: 40,
    bottom: 40
  },
  input: {
    backgroundColor: Colors.Grey,
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
  newTagInput: {
    backgroundColor: Colors.Grey,
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
    width: 180
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
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.Primary,
    padding: 20,
    margin: 20,
    borderWidth: 0,
    marginLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 20,
    borderRadius: 14,
    justifyContent: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold'
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  addTagButton: {
    marginBottom: 60
  }
})
