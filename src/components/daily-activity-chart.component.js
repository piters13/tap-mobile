import React from 'react'
import * as R from 'ramda'
import { inject, observer } from 'mobx-react'
import { PieChart } from 'react-native-svg-charts'

@inject('ActionsStore') @observer
export class DailyActivityChart extends React.Component {
  render () {
    const data = [
      {
        key: 1,
        value: 50,
        svg: { fill: '#600080' },
        arc: { outerRadius: '130%', cornerRadius: 10 }
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
      <PieChart
        style={{ height: 200 }}
        outerRadius={'70%'}
        innerRadius={10}
        data={data}
      />
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
