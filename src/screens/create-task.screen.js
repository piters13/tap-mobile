import React from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native'
import ActionButton from 'react-native-action-button'
import { Colors } from '../constants/colors'
import { TagList } from '../components/tag-list.component'
import { tagListMock } from '../data/tag-list-mock'
import { Button } from 'react-native-elements'

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
      <ScrollView style={styles.background} contentContainerStyle={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.container}>
          <View style={{width: '80%', paddingBottom: 20, paddingTop: 20}} >

            <Text style={styles.createTask}>Create task</Text>

            <TextInput placeholder='Task name'
              placeholderTextColor='#ffffff'
              underlineColorAndroid='transparent'
              style={styles.input}
              onChangeText={(taskName) => this.setState({taskName})}
              value={this.state.taskName} />

            <Text style={styles.addTags}>Add some tags</Text>

            <ScrollView horizontal>
              <TagList tags={tagListMock} />
            </ScrollView >

            <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 12}}>
              <TextInput placeholder='New tag'
                underlineColorAndroid='transparent'
                placeholderTextColor='#ffffff'
                style={styles.newTagInput}
                onChangeText={(tagName) => this.setState({tagName})}
                value={this.state.tagName} />

              <ActionButton size={40}
                style={{marginLeft: '55%'}}
                buttonColor={Colors.Primary}
                onPress={() => this.createTag()}
                position='left'
                offsetX={0} offsetY={0} />
            </View>

            <View style={{paddingTop: 25}}>
              <Button onPress={() => this.dismissModal()} buttonStyle={{
                backgroundColor: Colors.Primary,
                borderWidth: 0,
                borderRadius: 14,
                borderColor: 'transparent',
                padding: 10
              }} title='Confirm' titleStyle={{ fontWeight: '700' }} />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }

  createTag () {
  }

  createTask () {
  }

  dismissModal () {
    this.props.navigator.dismissModal({
      animationType: 'slide-horizontal',
      passProps: {},
      navigatorStyle: {
        navBarTranslucent: true,
        navBarTransparent: true
      },
      navigatorButtons: {}
    })
  }
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    borderRadius: 14,
    justifyContent: 'center',
    backgroundColor: Colors.DarkGrey,
    alignItems: 'center'
  },
  input: {
    backgroundColor: Colors.Grey,
    borderWidth: 0,
    borderRadius: 14,
    color: '#ffffff',
    padding: 10,
    fontSize: 14,
    marginBottom: 10
  },
  newTagInput: {
    backgroundColor: Colors.Grey,
    borderWidth: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 12,
    color: '#ffffff',
    fontSize: 13,
    width: '50%'
  },
  createTask: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#ffffff',
    paddingBottom: 10
  },
  addTags: {
    fontSize: 18,
    textAlign: 'left',
    color: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)'
  }
})
