import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'
import { Separator } from './separator.component'
import Modal from 'react-native-modal'

export class IntervalPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      interval: '30 m',
      isModalVisible: false
    }
  }

  render () {
    return (
      <View style={styles.itemStyle}>
        <Text style={styles.itemTextStyle}>Ping interval</Text>
        <Button transparent
          onPress={this.toggleModal}
          buttonStyle={styles.buttonStyle}
          containerViewStyle={{marginLeft: 0, marginRight: 12}}
          color={Colors.TextPrimary}
          rounded
          title={this.state.interval} />
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn={this.fadeInEntry()}
          onBackButtonPress={() => { this.toggleModal() }}
          onBackdropPress={() => { this.toggleModal() }}>
          <View style={styles.modalContent}>
            <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 10, color: Colors.TextPrimary}}>Ping me every...</Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({interval: '15 m'})
              }}
              style={styles.modalItem}>
              <Text style={{fontSize: 15}}>15 minutes</Text>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity
              onPress={() => {
                this.setState({interval: '30 m'})
              }}
              style={styles.modalItem}>
              <Text style={{fontSize: 15}}>30 minutes</Text>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity
              onPress={() => {
                this.setState({interval: '45 m'})
              }}
              style={styles.modalItem}>
              <Text style={{fontSize: 15}}>45 minutes</Text>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity
              onPress={() => {
                this.setState({interval: '1 h'})
              }}
              style={styles.modalItem}>
              <Text style={{fontSize: 15}}>1 hour</Text>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity
              onPress={() => {
                this.setState({interval: '1:30 h'})
              }}
              style={styles.modalItem}>
              <Text style={{fontSize: 15}}>1 hour 30 minutes</Text>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity
              onPress={() => {
                this.setState({interval: '2 h'})
              }}
              style={styles.modalItem}>
              <Text style={{fontSize: 15}}>2 hours</Text>
            </TouchableOpacity>
            <View style={{paddingTop: 20, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button transparent
                onPress={this.toggleModal}
                buttonStyle={styles.intervalButtonStyle}
                textStyle={{fontWeight: 'bold'}}
                color={Colors.TextPrimary}
                rounded
                title='CANCEL' />
              <Button transparent
                onPress={this.toggleModal}
                buttonStyle={styles.intervalButtonStyle}
                textStyle={{fontWeight: 'bold'}}
                containerViewStyle={{marginRight: 10}}
                color={Colors.Primary}
                rounded
                title='OK' />
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  fadeInEntry = () => {
    return {
      from: {opacity: 0}, to: {opacity: 1}
    }
  }
}

const styles = StyleSheet.create({
  itemTextStyle: {
    fontSize: 14,
    fontFamily: Styles.fonts.RobotoLight,
    color: Colors.TextPrimary
  },
  itemStyle: {
    paddingTop: 15,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 20,
    paddingTop: 20,
    width: '76%',
    marginLeft: '12%',
    borderRadius: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  modalItem: {
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    borderRadius: 5,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 7,
    paddingBottom: 7
  },
  intervalButtonStyle: {
    borderRadius: 5,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 7,
    paddingBottom: 7
  }
})
