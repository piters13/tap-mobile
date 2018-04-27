import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'
import { Separator } from './separator.component'
import { IntervalPicker } from './interval-picker.component'
import DateTimePicker from 'react-native-modal-datetime-picker'

export class Preferences extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false,
      isIntervalPickerVisible: false,
      startTime: '16:00',
      endTime: '18:00'
    }
  }

  render () {
    return (
      <View style={{paddingTop: 5}}>
        <Text style={styles.sectionTextStyle}>Preferences</Text>
        <Separator />
        <View style={styles.itemStyle}>
          <Text style={styles.itemTextStyle}>Workday start</Text>
          <Button transparent
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{marginLeft: 0, marginRight: 11}}
            onPress={this.showStartTimePicker}
            color={Colors.TextPrimary}
            rounded
            title={this.state.startTime} />
          <DateTimePicker
            isVisible={this.state.isStartTimePickerVisible}
            onConfirm={this.handleStartTimePicked}
            confirmTextStyle={Colors.Primary}
            onCancel={this.hideDateTimePicker}
            cancelTextStyle={Colors.Primary}
            mode='time' />
        </View>
        <View style={styles.itemStyle}>
          <Text style={styles.itemTextStyle}>Workday end</Text>
          <Button transparent
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{marginLeft: 0, marginRight: 11}}
            onPress={this.showEndTimePicker}
            color={Colors.TextPrimary}
            rounded
            title={this.state.endTime} />
          <DateTimePicker
            isVisible={this.state.isEndTimePickerVisible}
            onConfirm={this.handleEndTimePicked}
            onCancel={this.hideDateTimePicker}
            mode='time' />
        </View>
        <IntervalPicker />
      </View>
    )
  }

  showStartTimePicker = () =>
    this.setState({ isStartTimePickerVisible: true })

  showEndTimePicker = () =>
    this.setState({ isEndTimePickerVisible: true })

  handleStartTimePicked = time => {
    this.setState({
      isStartTimePickerVisible: false,
      startTime: time.toLocaleTimeString().slice(0, 5)
    })
  }

  handleEndTimePicked = time => {
    this.setState({
      isEndTimePickerVisible: false,
      endTime: time.toLocaleTimeString().slice(0, 5)
    })
  }

  hideDateTimePicker = () =>
    this.setState({
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false
    })
}

const styles = StyleSheet.create({
  sectionTextStyle: {
    fontSize: 22,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight,
    paddingBottom: 10
  },
  itemTextStyle: {
    fontSize: 14,
    fontFamily: Styles.fonts.RobotoLight,
    color: Colors.TextPrimary
  },
  itemStyle: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonStyle: {
    borderRadius: 5,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 7,
    paddingBottom: 7
  }
})
