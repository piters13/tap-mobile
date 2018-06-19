import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Header } from '../components/header.component'
import { Screens } from '../constants/screens'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'
import { Badge, Button } from 'react-native-elements'
import { NoteList } from '../components/note-list.component'
import { ActionList } from '../components/action-list.component'

export class ConcreteTaskScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'notes'
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth}}>
          <Header title={this.props.task.title} />
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableHighlight underlayColor={'transparent'} onPress={() => this.setState({type: 'notes'})}
              style={this.state.type === 'notes' ? styles.activeNotes : styles.touchableStyle} >
              <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: Styles.fonts.RobotoLight}}>Notes</Text>
                <Badge value={this.props.task.descriptions.length}
                  containerStyle={styles.firstBadgeStyle}
                  textStyle={styles.badgeTextStyle} />
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={'transparent'} onPress={() => this.setState({type: 'actions'})}
              style={this.state.type === 'notes' ? styles.touchableStyle : styles.activeActions} >
              <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: Styles.fonts.RobotoLight}}>Actions</Text>
                <Badge value={this.props.task.actions.length}
                  containerStyle={styles.secondBadgeStyle}
                  textStyle={styles.badgeTextStyle} />
              </View>
            </TouchableHighlight>
          </View>
          {this.showList()}
          {this.showAddNoteButton()}
        </View>
      </View>
    )
  }

  showList = () =>
    this.state.type === 'notes' ? this.showNotesList() : this.showActionsList()

  showNotesList = () => {
    return (
      <NoteList task={this.props.task} navigator={this.props.navigator} style={{marginBottom: 70, flex: 1}} />
    )
  }

  showActionsList = () => {
    return (
      <ActionList actions={this.props.task.actions} style={{marginBottom: 70, flex: 1}} />
    )
  }

  showAddNoteButton = () => {
    if (this.state.type === 'notes') {
      return (
        <View style={{position: 'absolute', width: '100%', bottom: 20, height: 65, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            backgroundColor={Colors.Primary}
            onPress={() => { this.goNewNote() }}
            fontSize={24}
            buttonStyle={{width: 65, height: 65}}
            title='+'
            borderRadius={50}
            textStyle={{marginTop: -2}}
            fontFamily={Styles.fonts.RobotoBold} />
        </View>
      )
    }
  }

  goNewNote = () => {
    return (
      this.props.navigator.push({
        screen: Screens.NewNote.screen,
        passProps: {
          task: this.props.task
        }
      })
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  touchableStyle: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingVertical: 10,
    marginBottom: 10
  },
  activeNotes: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomColor: '#2c7dce',
    borderBottomWidth: 2
  },
  activeActions: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomColor: '#3c40c6',
    borderBottomWidth: 2
  },
  firstBadgeStyle: {
    backgroundColor: '#2c7dce',
    borderRadius: 6,
    width: 37,
    height: 20,
    marginBottom: 3,
    paddingLeft: 5,
    paddingRight: 5
  },
  secondBadgeStyle: {
    backgroundColor: '#3c40c6',
    borderRadius: 6,
    width: 37,
    height: 20,
    paddingLeft: 5,
    paddingRight: 5
  },
  badgeTextStyle: {
    fontFamily: Styles.fonts.RobotoBlack,
    fontSize: 12
  }
})
