import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

export class ActionsScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
})
