import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Separator } from '../components/separator.component'
import { ActionListItem } from './action-list-item.component'

export class ActionList extends React.Component {
  constructor (props) {
    super(props)
    this.props.detailed = this.props.detailed || false
  }

  render () {
    return (
      <View style={this.props.style}>
        <Separator />
        <FlatList data={this.props.actions}
          keyExtractor={(item, index) => item.id}
          ItemSeparatorComponent={Separator}
          renderItem={({item}) => (
            <View>
              <ActionListItem item={item}
                navigator={this.props.navigator}
                style={styles.listItemStyle} />
            </View>
          )} />
        <Separator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
  }
})
