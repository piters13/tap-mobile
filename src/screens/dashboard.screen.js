import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'
import { inject, observer } from 'mobx-react'
import { DailyActivityChart } from '../components/daily-activity-chart.component'
import { WeeklyActivityChart } from '../components/weekly-activity-chart.component'
import { toJS } from 'mobx'
import { Colors } from '../constants/colors'

@inject('AuthStore', 'ActionsStore') @observer
export class DashboardScreen extends React.Component {
  constructor (props) {
    super(props)

    this.props.ActionsStore.fetchActions()
  }

  render () {
    const actions = toJS(this.props.ActionsStore.actions)
    const loading = toJS(this.props.ActionsStore.loading)
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth}}>
          <Header title={`How are you, ${this.props.AuthStore.user.firstname}?`} />
          <ScrollView style={styles.componentsStyle}>
            <Text style={styles.heading}>Your today's activities</Text>
            {loading ? <Text>Loading...</Text> : <DailyActivityChart actions={actions} />}
            <View style={{height: 30}}/>
            <Text style={styles.heading}>Your activities on last days</Text>
            {loading ? <Text>Loading...</Text> : <WeeklyActivityChart actions={actions} />}
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
  heading: {
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 20,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoBold
  }
})
