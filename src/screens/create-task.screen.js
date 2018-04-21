import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../constants/colors'
import { TagList } from '../components/tag-list.component'
import { tagListMock } from '../data/tag-list-mock'
import { Button } from 'react-native-elements'
import { Styles } from '../constants/styles'

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
      <ScrollView style={styles.background}
        contentContainerStyle={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.container}>
          <View style={{width: '80%', paddingBottom: 20, paddingTop: 20}}>

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
            </ScrollView>

            <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 12}}>
              <TextInput placeholder='New tag'
                underlineColorAndroid='transparent'
                placeholderTextColor='#ffffff'
                style={styles.newTagInput}
                onChangeText={(tagName) => this.setState({tagName})}
                value={this.state.tagName} />

              <Button
                backgroundColor={Colors.Primary}
                fontSize={18}
                buttonStyle={{width: 36, height: 36}}
                borderRadius={18}
                title='+'
                textStyle={{marginTop: -2}}
                fontFamily={Styles.fonts.RobotoBold} />
            </View>

            <Button
              onPress={() => this.dismissModal()}
              backgroundColor={Colors.Primary}
              containerViewStyle={{marginLeft: 0, marginRight: 0, marginTop: 25}}
              fontSize={14}
              borderRadius={14}
              buttonStyle={{padding: 10}}
              title='Confirm'
              fontFamily={Styles.fonts.RobotoBold} />
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
    setTimeout(() => {
      this.props.navigator.dismissModal({
        animationType: 'slide-horizontal',
        passProps: {},
        navigatorStyle: {
          navBarTranslucent: true,
          navBarTransparent: true
        },
        navigatorButtons: {}
      })
    }, 500)
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
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
    fontFamily: Styles.fonts.RobotoBold,
    textAlign: 'left',
    color: '#ffffff',
    paddingBottom: 10
  },
  addTags: {
    fontSize: 16,
    fontFamily: Styles.fonts.RobotoLight,
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
