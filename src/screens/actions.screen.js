import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { ActionList } from '../components/action-list.component'

@inject('ActionsStore') @observer
export class ActionsScreen extends React.Component {
  constructor (props) {
    super(props)

    props.ActionsStore.fetchActions()
  }

  render () {
    const actions = toJS(this.props.ActionsStore.actions)

    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth}}>
          <Header title={`Actions`} subtitle={`Updated 5 mins ago`} />
          <ActionList actions={actions} style={{flex: 1, marginBottom: 70}} navigator={this.props.navigator} />
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
