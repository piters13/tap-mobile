import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'
import Modal from 'react-native-modal'

export class IntervalPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      interval: '30 m',
      isModalVisible: false
    }
  }

  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render () {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={styles.itemTextStyle}>Ping interval</Text>
        <TouchableOpacity style={styles.itemStyle} onPress={this.toggleModal}>
          <Text>{this.state.interval}</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                this.setState({interval: '15 m'})
                this.toggleModal()
              }}
              style={styles.modalItem}>
              <Text>15 m</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => {
                this.setState({interval: '30 m'})
                this.toggleModal()
              }}
              style={styles.modalItem}>
              <Text>30 m</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => {
                this.setState({interval: '45 m'})
                this.toggleModal()
              }}
              style={styles.modalItem}>
              <Text>45 m</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => {
                this.setState({interval: '1 h'})
                this.toggleModal()
              }}
              style={styles.modalItem}>
              <Text>1 h</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => {
                this.setState({interval: '1:30 h'})
                this.toggleModal()
              }}
              style={styles.modalItem}>
              <Text>1:30 h</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => {
                this.setState({interval: '2 h'})
                this.toggleModal()
              }}
              style={styles.modalItem}>
              <Text>2 h</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleModal} style={{paddingTop: 10, alignItems: 'flex-end'}}>
              <Text style={{color: 'black'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemTextStyle: {
    fontSize: 14,
    fontFamily: Styles.fonts.RobotoLight,
    color: Colors.TextPrimary
  },
  itemStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    width: '70%',
    marginLeft: '15%',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  separator: {
    height: 1,
    backgroundColor: '#c9d1d8',
    width: '70%',
    alignSelf: 'center'
  },
  modalItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
})
