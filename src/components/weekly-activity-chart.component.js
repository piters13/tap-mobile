import React from 'react'
import * as R from 'ramda'
import { View, Text as NativeText } from 'react-native'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

export class WeeklyActivityChart extends React.Component {
  renderWeeklyActivity () {
    const data = this.getWeeklyActions()
    if (R.isEmpty(data)) {
      return <NativeText> You didn't do anything progressive during this week! Don't give up! Let's do something ;)</NativeText>
    } else {
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
      )
    }
  }

  render () {
    return <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
      {this.renderWeeklyActivity()}
    </View>
  }

  getWeeklyActions () {
    const getDay = (date) => `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    const weekAgoDate = new Date()
    weekAgoDate.setDate(weekAgoDate.getDate() - 7)
    const weekBeforeToday = getDay(weekAgoDate)
    const getDayOfAction = (action) => getDay(new Date(action.createdAt))
    const filteredActions = this.props.actions.filter(a => getDayOfAction(a) >= weekBeforeToday)
    if (R.isEmpty(filteredActions)) {
      return {}
    } else {
      const sortByDate = R.sortBy(R.prop('createdAt'), filteredActions)
      const actionsByDate = R.groupBy(a => getDayOfAction(a), sortByDate)
      const actionsByDateAndType = Object.keys(actionsByDate)
        .reduce(
          (prev, next) => Object.assign(prev, {[next]: R.groupBy(R.prop('type'),
            actionsByDate[next])}),
          {})

      const valuesByDateAndType = Object.values(actionsByDateAndType)
      var result = []
      for (let i of valuesByDateAndType) {
        result.push(i.hasOwnProperty('0') ? i[0].length : 0)
      }
      return result
    }
  }
}
