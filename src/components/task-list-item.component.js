import React from 'react'
import { Text, View } from 'react-native'

export class TaskListItem extends React.Component {
  render () {
    return (
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          {this.props.item.name}
        </Text>
        <Text style={{paddingBottom: 10}}>
          {this.props.item.subtitle}
        </Text>
      </View>
    )
  }
}
