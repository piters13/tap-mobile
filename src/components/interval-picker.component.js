import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Button } from 'react-native-elements'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'
import { Separator } from './separator.component'
import Modal from 'react-native-modal'

export class IntervalPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      intervalValue: 30,
      intervalLabel: '30 min',
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
          title={this.state.intervalLabel} />
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn={this.fadeInEntry()}
          onBackButtonPress={() => { this.toggleModal() }}
          onBackdropPress={() => { this.toggleModal() }}>
          <View style={styles.modalContent}>
            <FlatList
              ListHeaderComponent={
                <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 10, color: Colors.TextPrimary}}>
                  Ping me every...
                </Text>}
              ItemSeparatorComponent={Separator}
              data={[{value: 15, shortLabel: '15 min', label: '15 minutes'}, {value: 30, shortLabel: '30 min', label: '30 minutes'},
                {value: 45, shortLabel: '45 min', label: '45 minutes'}, {value: 60, shortLabel: '1h', label: '1 hour'},
                {value: 90, shortLabel: '1:30h', label: '1 hour 30 minutes'}, {value: 120, shortLabel: '2h', label: '2 hours'}]}
              renderItem={({ item }) => (
                this.renderRow(item)
              )}
              keyExtractor={(item, index) => index}
            />
            <View style={{paddingTop: 20, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button transparent
                onPress={this.toggleModal}
                buttonStyle={styles.intervalButtonStyle}
                textStyle={{fontWeight: 'bold'}}
                containerViewStyle={{marginRight: 0}}
                color={Colors.TextPrimary}
                rounded
                title='CANCEL' />
              <Button transparent
                onPress={this.toggleModal}
                buttonStyle={styles.intervalButtonStyle}
                textStyle={{fontWeight: 'bold'}}
                containerViewStyle={{marginLeft: 0, marginRight: 0}}
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

  renderRow = (item) => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({intervalValue: item.value, intervalLabel: item.shortLabel})}
        style={styles.modalItem}>
        {item.value === this.state.intervalValue
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
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 7,
    paddingBottom: 7
  }
})
