import React from 'react'
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native'
import { Header } from '../components/header.component'
import { Button, FormInput, FormLabel } from 'react-native-elements'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'

export class NewNoteScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      noteTitle: {
        value: ''
      },
      noteContent: {
        value: ''
      }
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
            <View style={{paddingTop: '10%'}}>
              {this.showCurrentDate()}
            </View>
            <Header title={this.props.title} style={{paddingBottom: 0, paddingTop: 0}} />
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
              autoCapitalize='none'
              underlineColorAndroid='transparent'
            />
            <FormLabel fontFamily={Styles.fonts.RobotoMedium} labelStyle={styles.formLabelStyle}>Content</FormLabel>
            <FormInput multiline
              blurOnSubmit={false}
              onSubmitEditing={() => {}}
              ref={input => { this.inputs.noteContent = input }}
              containerStyle={styles.containerInputStyle}
              inputStyle={styles.formContentInputStyle}
              onChangeText={(note) => this.setState({noteContent: note})}
              value={this.state.noteContent.value}
              autoCapitalize='none'
              placeholder='Write something awesome...'
              underlineColorAndroid='transparent' />

            <View style={{position: 'absolute', width: '100%', bottom: 20, alignItems: 'center', justifyContent: 'center'}}>
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
                onPress={() => {}}
                backgroundColor={Colors.Primary}
                containerViewStyle={{marginLeft: 0, marginRight: 0, marginTop: 15, width: '100%'}}
                fontSize={14}
                borderRadius={14}
                buttonStyle={{padding: 10}}
                title='Save this note'
                fontFamily={Styles.fonts.RobotoBold} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    )
  }

  showCurrentDate = () => {
    let today = new Date()
    let day = today.getDate()
    let month = parseInt(today.getMonth() + 1)
    let year = today.getFullYear()
    let hour = today.getHours()
    let minutes = today.getMinutes()
    if (day < 10) { day = '0' + day }
    if (month < 10) { month = '0' + month }
    if (hour < 10) { hour = '0' + hour }
    if (minutes < 10) { minutes = '0' + minutes }
    let date = day + '.' + month + '.' + year + ', ' + hour + ':' + minutes
    return (
      <Text>{date}</Text>
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
    height: 170,
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
    marginRight: 0
  }
})
