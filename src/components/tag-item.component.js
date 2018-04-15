import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

export class TagItem extends React.Component {
  render () {
    return (
      <View style={styles.tagButton}>
        <TouchableHighlight underlayColor='white'>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{this.props.item.name}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tagButton: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  tagText: {
    padding: 20,
    color: 'white'
  }
})
