import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Header } from '../components/header.component'
import { Device } from '../components/device.component'
import { Preferences } from '../components/preferences.component'
import { Profile } from '../components/profile.component'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'
import { PieChart } from 'react-native-svg-charts'

export class SettingsScreen extends React.Component {
  render () {
    const data = [
      {
        key: 1,
        value: 50,
        svg: { fill: '#600080' },
        arc: { outerRadius: '130%', cornerRadius: 10,  }
      },
      {
        key: 2,
        value: 50,
        svg: { fill: '#9900cc' }
      },
      {
        key: 3,
        value: 40,
        svg: { fill: '#c61aff' }
      },
      {
        key: 4,
        value: 95,
        svg: { fill: '#d966ff' }
      },
      {
        key: 5,
        value: 35,
        svg: { fill: '#ecb3ff' }
      }
    ]

    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth}}>
          <Header title={`Settings`} subtitle={`Adjust your experience`} />
          <ScrollView style={styles.componentsStyle}>
            <Device navigator={this.props.navigator} />
            <Preferences />
            <Profile />
            <PieChart
              style={{ height: 200 }}
              outerRadius={'70%'}
              innerRadius={10}
              data={data}
            />
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
