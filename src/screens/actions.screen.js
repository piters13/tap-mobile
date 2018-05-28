import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header } from '../components/header.component'
import { ActionsList } from '../components/action-list-component'
import { Styles } from '../constants/styles'
import { actionsListMock } from '../data/actions-list-mock'

export class ActionsScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth}}>
          <Header title={`Tasks`} subtitle={`Updated 5 mins ago`} />
          <ActionsList actions={actionsListMock} style={{marginBottom: 70, flex: 1}} />
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
