import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'

export class ConcreteNoteScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={{width: Styles.baseWidth}}>
          <ScrollView style={{marginTop: '15%'}}>
            <Header title={this.props.title} style={{paddingTop: 0}} />
            <Text style={{paddingBottom: 5, fontSize: 20, color: Colors.TextPrimary, fontFamily: Styles.fonts.RobotoMedium}}>{this.props.noteTitle}</Text>
            <View style={{paddingBottom: 10}}>
              {this.showCurrentDate()}
            </View>
            <Text style={{fontSize: 18, fontFamily: Styles.fonts.RobotoLight}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </ScrollView>
        </View>
      </View>
    )
  }

  showCurrentDate = () => {
    let today = new Date()
    let day = today.getDate()
    let month = parseInt(today.getMonth() + 1)
    let year = today.getFullYear()
    let hour = today.getHours()
    let minutes = today.getMinutes()
    if (day < 10) { day = '0' + day }
    if (month < 10) { month = '0' + month }
    if (hour < 10) { hour = '0' + hour }
    if (minutes < 10) { minutes = '0' + minutes }
    let date = day + '.' + month + '.' + year + ', ' + hour + ':' + minutes
    return (
      <Text>{date}</Text>
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
