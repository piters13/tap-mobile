import React from 'react'
import * as R from 'ramda'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native'

export class DailyActivityChart extends React.Component {
  renderDailyActivity () {
    const data = this.getActionsCount()
    if (R.isEmpty(data)) {
      return <Text> You didn't do anything progressive today! Don't give up! Let's do something ;)</Text>
    } else {
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
  }
  render () {
    return this.renderDailyActivity()
  }

  getActionsCount () {
    const getDay = (date) => `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    const today = getDay(new Date())
    const actions = this.props.actions.filter(a => getDay(new Date(a.createdAt)) === today)
    if (R.isEmpty(actions)) {
      return {}
    } else {
      const actionsByType = R.groupBy(a => a.type, actions)
      return [
        actionsByType.hasOwnProperty('0') ? actionsByType[0].length : 0,
        actionsByType.hasOwnProperty('1') ? actionsByType[1].length : 0
      ]
    }
  }
}
