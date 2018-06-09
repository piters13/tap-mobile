import React from 'react'
import * as R from 'ramda'
import { View } from 'react-native'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

export class WeeklyActivityChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      workActionsCount: 0,
      restActionsCount: 0
    }
  }
  render () {
    const data = [ this.workActionsCount, this.workActionsCount ]
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
    const getDay = (date) => `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    const today = getDay(new Date())
    const weekBeforeToday = new Date(today.getTime())
    weekBeforeToday.setDate(today.getDate() - 7)
    const actions = this.props.actions.filter(a => getDay(a) <= weekBeforeToday)

    const actionsByType = R.groupBy(a => a.type, actions)
    const last7days = R.take(7, actionsByType)

    this.setState({
      workActionsCount: last7days[0].length,
      restActionsCount: last7days[1].length
    })
  }
}
