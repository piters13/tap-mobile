import React from 'react'
import * as R from 'ramda'
import { inject, observer } from 'mobx-react'
import { StyleSheet, View, Text } from 'react-native'

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
]

@inject('ActionsStore') @observer
export class DailyActivityChart extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text> Hi K! </Text>
      </View>
    )
  }
  // const actionsCount = this.getActionsCount()
  // actionsCount.restActionsCount
  // const data = [
  //   {name: 'Activity', value: 19},
  //   {name: 'Rest', value: 4}
  // ]

  getActionsCount () {
    const actions = this.props.ActionsStore.actions
    const actionsByDay = R.groupBy(a => a.createdAt, actions)
    const newestActions = R.filter(R.where({actionsByDay: R.contains(this.getLatestDay(actionsByDay))}))
    const newestActionsByType = R.groupBy(a => a.type, newestActions)

    this.setState({
      workActionsCount: newestActionsByType[0].length,
      restActionsCount: newestActionsByType[1].length
    })
  }

  getLatestDay (a) {
    return new Date(Math.max.apply(null, a.map(function (e) {
      return new Date(e.CreatedAt)
    })))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  }
})
