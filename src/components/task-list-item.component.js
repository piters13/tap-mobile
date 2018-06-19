import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Badge } from 'react-native-elements'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'

export class TaskListItem extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <TouchableOpacity onPress={() => this.props.callbackFn(this.props.item)}>
        <View style={this.props.style}>
          <View>
            <Text numberOfLines={1} style={styles.titleStyle}>
              {this.props.item.title}
            </Text>
            <Text style={styles.subtitleStyle}>
              {this.props.item.subtitle}
              {this.props.emph ? 'CONNECTED' : ''}
            </Text>
          </View>
          <View>
            <Badge value={this.props.item.descriptions.length} containerStyle={styles.firstBadgeStyle}
              textStyle={styles.badgeTextStyle} />
            <Badge value={this.props.item.actions.length} containerStyle={styles.secondBadgeStyle}
              textStyle={styles.badgeTextStyle} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    flex: 1,
    maxWidth: 200,
    fontSize: 22,
    paddingTop: 5,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight
  },
  subtitleStyle: {
    fontSize: 13,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight
  },
  firstBadgeStyle: {
    backgroundColor: '#3c40c6',
    borderRadius: 6,
    width: 37,
    height: 20,
    marginBottom: 3,
    paddingLeft: 5,
    paddingRight: 5
  },
  secondBadgeStyle: {
    backgroundColor: '#2c7dce',
    borderRadius: 6,
    width: 37,
    height: 20,
    paddingLeft: 5,
    paddingRight: 5
  },
  badgeTextStyle: {
    fontFamily: Styles.fonts.RobotoBlack,
    fontSize: 12
  }
})
