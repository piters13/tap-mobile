import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { DevicesListItem } from '../components/device-list-item.component'
import { Separator } from '../components/separator.component'

export class DevicesList extends React.Component {
  render () {
    return (
      <View style={this.props.style}>
        <Separator />
        <FlatList data={this.props.devices} ItemSeparatorComponent={Separator}
          renderItem={({item, index}) => (
            <View>
              <DevicesListItem
                callbackFn={this.props.callbackFn}
                navigator={this.props.navigator}
                item={item}
                index={index} style={styles.listItemStyle} />
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
