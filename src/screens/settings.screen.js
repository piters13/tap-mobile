import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Header } from '../components/header.component'
import { Device } from '../components/device.component'
import { Preferences } from '../components/preferences.component'
import { Profile } from '../components/profile.component'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'

@inject('Auth') @observer
export class SettingsScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth}}>
          <Header title={`Settings`} subtitle={`Adjust your experience`} />
          <ScrollView style={styles.componentsStyle}>
            <Device navigator={this.props.navigator} />
            <Preferences />
            <Profile navigator={this.props.navigator} />
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  itemStyle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
  },
  itemTextStyle: {
    fontSize: 13,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight
  },
  componentsStyle: {
    marginBottom: '15%'
  }
})
