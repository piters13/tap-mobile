import React from 'react'
import * as R from 'ramda'
import { PieChart } from 'react-native-svg-charts'

export class DailyActivityChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      workActionsCount: 0,
      restActionsCount: 0
    }
  }

  componentDidMount () {
    this.getActionsCount()
  }
  render () {
    let data = [ this.workActionsCount, this.workActionsCount ]
    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
    // const colors = ['#ffa31a', '#66ff33']
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
    const getDay = (date) => `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    const today = getDay(new Date())
    console.log('ff' + this.props.actions)
    const actions = this.props.actions.filter(a => getDay(a) === today)
    const actionsByType = R.groupBy(a => a.type, actions)
    console.log('Actions ' + actions)
    this.setState({
      workActionsCount: actionsByType.hasOwnProperty('0') ? actionsByType[0].length : 0,
      restActionsCount: actionsByType.hasOwnProperty('1') ? actionsByType[1].length : 0
    })
  }
}
