import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ActionsListItem } from '../components/actions-list-item.component'
import { Separator } from '../components/separator.component'

export class ActionsList extends React.Component {
  render () {
    return (
      <View style={this.props.style}>
        <Separator />
        <FlatList data={this.props.actions} ItemSeparatorComponent={Separator}
          renderItem={({item, index}) => (
            <View>
              <ActionsListItem item={item} index={index} style={styles.listItemStyle} />
            </View>
          )} keyExtractor={item => item.id} />
        <Separator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItemStyle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
  }
})
