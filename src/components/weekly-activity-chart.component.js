import React from 'react'
import * as R from 'ramda'
import { inject, observer } from 'mobx-react'
import { View } from 'react-native'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

@inject('ActionsStore') @observer
export class WeeklyActivityChart extends React.Component {
  render () {
    const data = [ 10, 5, 25, 15, 20, 7, 6 ]

    const CUT_OFF = 20
    const Labels = ({ x, y, bandwidth, data }) => (
      data.map((value, index) => (
        <Text
          key={index}
          x={x(index) + (bandwidth / 2)}
          y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
          fontSize={14}
          fill={value >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}
        >
          {value}
        </Text>
      ))
    )

    return (
      <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
        <BarChart
          style={{ flex: 1 }}
          data={data}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <Grid direction={Grid.Direction.HORIZONTAL} />
          <Labels />
        </BarChart>
      </View>
    )
  }
  getWeeklyActions () {
    const actions = this.props.ActionsStore.actions
    const sortByDate = R.reverse(R.sortBy(R.prop('createdAt'), actions))
    const actionsByDay = R.groupBy(a => a.createdAt, sortByDate)
    const last7days = R.take(7, actionsByDay)

    return last7days
  }

  getLatestDay (a) {
    return new Date(Math.max.apply(null, a.map(function (e) {
      return new Date(e.CreatedAt)
    })))
  }
}
