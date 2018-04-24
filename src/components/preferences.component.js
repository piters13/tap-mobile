import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'
import DateTimePicker from 'react-native-modal-datetime-picker'

export class Preferences extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false,
      startTime: '16:00',
      endTime: '18:00'
    }
  }

  render () {
    return (
      <View style={this.props.style}>
        <Text style={styles.sectionTextStyle}>Preferences</Text>
        <View style={{ height: 1, backgroundColor: '#c9d1d8', width: '100%' }} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={styles.itemTextStyle}>Workday start</Text>
          <TouchableOpacity style={styles.itemStyle} onPress={this.showStartTimePicker}>
            <Text>{this.state.startTime}</Text>
            <DateTimePicker
              isVisible={this.state.isStartTimePickerVisible}
              onConfirm={this.handleStartTimePicked}
              onCancel={this.hideDateTimePicker}
              mode='time'
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={styles.itemTextStyle}>Workday end</Text>
          <TouchableOpacity style={styles.itemStyle} onPress={this.showEndTimePicker}>
            <Text>{this.state.endTime}</Text>
            <DateTimePicker
              isVisible={this.state.isEndTimePickerVisible}
              onConfirm={this.handleEndTimePicked}
              onCancel={this.hideDateTimePicker}
              mode='time'
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.itemStyle}>
          <Text style={styles.itemTextStyle}>Ping interval</Text>
        </TouchableOpacity>
      </View>
    )
  }

  showStartTimePicker = () => this.setState({ isStartTimePickerVisible: true })

  showEndTimePicker = () => this.setState({ isEndTimePickerVisible: true })

  handleStartTimePicked = (time) => {
    this.setState({ isStartTimePickerVisible: false, startTime: time.toLocaleTimeString().match(/\d{2}:\d{2}/) })
  }

  handleEndTimePicked = (time) => {
    this.setState({ isEndTimePickerVisible: false, endTime: time.toLocaleTimeString().match(/\d{2}:\d{2}/) })
  }

  hideDateTimePicker = () => this.setState({ isStartTimePickerVisible: false, isEndTimePickerVisible: false })
}

const styles = StyleSheet.create({
  sectionTextStyle: {
    fontSize: 22,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight
  },
  itemTextStyle: {
    fontSize: 14,
    fontFamily: Styles.fonts.RobotoLight,
    color: Colors.TextPrimary
  },
  itemStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20
  }
})
