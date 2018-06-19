import React from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Header } from '../components/header.component'
import { Button, FormInput, FormLabel } from 'react-native-elements'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'
import { inject, observer } from 'mobx-react'

@inject('TasksStore') @observer
export class NewNoteScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      noteTitle: {
        value: ''
      },
      noteContent: {
        value: ''
      },
      loading: false
    }

    this.inputs = {
      noteTitle: null,
      noteContent: null
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{width: Styles.baseWidth}}>
          <KeyboardAvoidingView
            style={{height: '100%'}} enabled>
            <Header title={'Create note'} subtitle={this.props.task.title} />

            <FormLabel fontFamily={Styles.fonts.RobotoMedium} labelStyle={styles.formLabelStyle}>Title</FormLabel>
            <FormInput
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.inputs.noteContent.focus()
              }}
              returnKeyType={'next'}
              ref={input => { this.inputs.noteTitle = input }}
              containerStyle={styles.containerInputStyle}
              inputStyle={styles.formInputStyle}
              onChangeText={(title) => this.setState({noteTitle: title})}
              value={this.state.noteTitle.value}
              placeholder="What's your note about?"
              autoCapitalize='sentences'
              underlineColorAndroid='transparent'
            />

            <View style={{flex: 1}}>
              <FormLabel fontFamily={Styles.fonts.RobotoMedium} labelStyle={styles.formLabelStyle}>Content</FormLabel>
              <FormInput multiline
                blurOnSubmit={false}
                onSubmitEditing={() => {}}
                ref={input => { this.inputs.noteContent = input }}
                containerStyle={styles.containerInputStyle}
                inputStyle={styles.formContentInputStyle}
                onChangeText={(note) => this.setState({noteContent: note})}
                value={this.state.noteContent.value}
                autoCapitalize='sentences'
                placeholder='Write something awesome...'
                underlineColorAndroid='transparent' />
            </View>

            <View
              style={{width: '100%', marginBottom: 20, marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
              <Button
                onPress={() => {}}
                backgroundColor='#DCDCDC'
                textStyle={{color: 'black'}}
                containerViewStyle={{marginLeft: 0, marginRight: 0, marginTop: 15, width: '100%'}}
                fontSize={14}
                borderRadius={14}
                buttonStyle={{padding: 10}}
                leftIcon={{name: 'camera', type: 'feather', style: {color: 'black'}}}
                title='Add in a photo'
                fontFamily={Styles.fonts.RobotoBold} />

              <Button
                onPress={() => this.saveNote()}
                backgroundColor={Colors.Primary}
                containerViewStyle={{marginLeft: 0, marginRight: 0, marginTop: 15, width: '100%'}}
                fontSize={14}
                borderRadius={14}
                buttonStyle={{padding: 10}}
                title='Save this note'
                fontFamily={Styles.fonts.RobotoBold}
                disabled={this.state.loading} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    )
  }

  saveNote = () => {
    this.setState({loading: true})
    apolloClient.mutate({
      mutation: gql`mutation CreateDescription($noteTitle: String!, $noteContent: String!, $id: Int!) {
          addDescription(description: {
              title: $noteTitle
              value: $noteContent,
              taskId: $id
          }) {title, value, id, createdAt}
      }`,
      variables: {
        noteTitle: this.state.noteTitle,
        noteContent: this.state.noteContent,
        id: this.props.task.id
      }
    }).then((res) => {
      if (res.data) {
        this.props.TasksStore.fetchTasks()
          .then(() => this.props.navigator.pop())
      }
    })
    .catch(() => this.setState({loading: false}))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  formInputStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 5,
    paddingBottom: 5,
    width: 'auto',
    minHeight: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 15,
    fontFamily: Styles.fonts.Roboto,
    color: Colors.TextPrimary
  },
  formContentInputStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
    minHeight: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 15,
    fontFamily: Styles.fonts.Roboto,
    color: Colors.TextPrimary,
    textAlignVertical: 'top'
  },
  formLabelStyle: {
    fontSize: 13,
    color: Colors.TextPrimary,
    marginTop: 5,
    marginLeft: 0,
    marginBottom: 0,
    marginRight: 0,
    fontWeight: '400'
  },
  containerInputStyle: {
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: 0,
    height: 'auto'
  }
})
