import React from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { Colors } from '../constants/colors'

export class NewNoteScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={{paddingTop: '10%', paddingBottom: '5%', width: '90%'}}>
          {this.showCurrentDate()}
        </View>
        <TextInput multiline
          placeholder='Type your note here...'
          underlineColorAndroid='transparent'
          style={{height: '70%', width: '90%', textAlignVertical: 'top'}} />
        <View
          style={{position: 'absolute', width: '100%', bottom: 20, height: 65, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            backgroundColor={Colors.Primary}
            onPress={() => {}}
            buttonStyle={{width: 65, height: 65}}
            icon={{name: 'camera', type: 'font-awesome', style: {marginRight: 0}}}
            borderRadius={50} />
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
})
