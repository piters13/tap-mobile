import React from 'react'
import * as R from 'ramda'
import { inject, observer } from 'mobx-react'
import { PieChart } from 'react-native-svg-charts'

@inject('ActionsStore') @observer
export class DailyActivityChart extends React.Component {
  render () {
    // let actionsCount = this.getActionsCount()

    // let data = [ actionsCount.restActionsCount, actionsCount.workActionsCount ]
    const data = [3, 5]
    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

    const pieData = data
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: randomColor(),
          onPress: () => console.log('press', index)
        },
        key: `pie-${index}`
      }))

    return (
      <PieChart
        style={{ height: 200 }}
        data={pieData}
      />
    )
  }

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
