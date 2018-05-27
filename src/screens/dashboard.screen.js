import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'
import { inject, observer } from 'mobx-react'
import { DailyActivityChart } from '../components/daily-activity-chart.component'

@inject('AuthStore') @observer
export class DashboardScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth}}>
          <Header title={`Hi ` + this.props.AuthStore.user.firstname} />
          <DailyActivityChart />
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
  }
})
