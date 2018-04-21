import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'

export class Device extends React.Component {
  render () {
    return (
      <View style={this.props.style}>
        <Text style={styles.sectionTextStyle}>Device</Text>
        <View style={{ height: 1, backgroundColor: '#c9d1d8', width: '100%' }} />
        <View style={{paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{fontSize: 14, fontFamily: Styles.fonts.RobotoLight, color: Colors.TextPrimary}}>I am connected!</Text>
          <Button transparent
            onPress={() => this.showAlert()}
            containerViewStyle={{marginLeft: 0, marginRight: 0}}
            buttonStyle={{borderRadius: 5, paddingLeft: 12, paddingRight: 12, paddingTop: 7, paddingBottom: 7}}
            color={Colors.TextPrimary}
            rounded
            title='DETACH' />
        </View>
      </View>
    )
  }

  showAlert = () => {
    Alert.alert(
      'Are you sure you want to detach the device?', '',
      [
        {text: 'Yes', onPress: () => console.log('Yes pressed')},
        {text: 'No', onPress: () => {}, style: 'cancel'}
      ],
      { cancelable: false }
    )
  }
}

const styles = StyleSheet.create({
  sectionTextStyle: {
    fontSize: 22,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight
  }
})
