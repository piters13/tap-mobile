import React from 'react'
import { inject, observer } from 'mobx-react'
import { Images } from '../constants/images'
import { Image, StyleSheet, View } from 'react-native'
import { initPrivateApp, initPublicApp } from '../../App'

@inject('AuthStore') @observer
export class MainScreen extends React.Component {
  async componentDidMount () {
    await this.props.AuthStore.rehydrate()

    setTimeout(() => {
      if (this.props.AuthStore.isLogged) {
        initPrivateApp()
        this.props.AuthStore.fetchUser()
      } else {
        initPublicApp()
      }
    }, 1500)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image source={Images.Logo} style={styles.logo} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  logo: {
    resizeMode: 'contain',
    height: 120
  }
})
