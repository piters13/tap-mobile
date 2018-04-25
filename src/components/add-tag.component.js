import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TagList } from '../components/tag-list.component'
import { tagListMock } from '../data/tag-list-mock'

export class AddTag extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <TagList tags={tagListMock} style={{width: 260, flex: 1}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  }
})
