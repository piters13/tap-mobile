import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Button } from 'react-native-elements'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'
import { Separator } from './separator.component'
import Modal from 'react-native-modal'

const intervals = [
  {value: 15, shortLabel: '15 min', label: '15 minutes'},
  {value: 30, shortLabel: '30 min', label: '30 minutes'},
  {value: 45, shortLabel: '45 min', label: '45 minutes'},
  {value: 60, shortLabel: '1h', label: '1 hour'},
  {value: 90, shortLabel: '1:30h', label: '1 hour 30 minutes'},
  {value: 120, shortLabel: '2h', label: '2 hours'}]

export class IntervalPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      interval: intervals.find(x => x.value === 30),
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
          title={this.state.interval.shortLabel} />
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn={this.fadeInEntry()}
          animationOut={this.fadeOutExit()}
          onBackButtonPress={() => this.toggleModal()}
          onBackdropPress={() => this.toggleModal()}>
          <View style={styles.modalContent}>
            <FlatList
              ListHeaderComponent={
                <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 10, color: Colors.TextPrimary}}>
                  Ping me every...
                </Text>}
              ItemSeparatorComponent={Separator}
              data={intervals}
              renderItem={({ item }) => (
                this.renderRow(item)
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
          <View style={styles.modalFooter}>
            <Button transparent
              onPress={this.toggleModal}
              buttonStyle={styles.buttonStyle}
              containerViewStyle={{marginRight: 0}}
              color={Colors.TextPrimary}
              rounded
              title='CANCEL' />
            <Button transparent
              onPress={this.toggleModal}
              buttonStyle={styles.confirmButtonStyle}
              textStyle={{fontWeight: 'bold'}}
              containerViewStyle={{marginLeft: 0, marginRight: 0}}
              color={Colors.Primary}
              rounded
              title='OK' />
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

  fadeOutExit = () => {
    return {
      from: {opacity: 1}, to: {opacity: 0}
    }
  }

  renderRow = (item) => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({interval: item})}
        style={styles.modalItem}>
        {item.value === this.state.interval.value
          ? <Text style={{fontSize: 15, fontWeight: 'bold', color: Colors.Primary}}>{item.label}</Text>
          : <Text style={{fontSize: 15}}>{item.label}</Text>}
      </TouchableOpacity>
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
    paddingBottom: 10,
    paddingTop: 20,
    width: '80%',
    marginLeft: '10%',
    borderRadius: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  modalFooter: {
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingRight: 5,
    width: '80%',
    marginLeft: '10%',
    borderRadius: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    justifyContent: 'flex-end'
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
  confirmButtonStyle: {
    borderRadius: 5,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 7,
    paddingBottom: 7
  }
})
