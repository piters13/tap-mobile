import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'

export class ConcreteNoteScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={{width: Styles.baseWidth}}>
          <ScrollView style={{marginTop: '15%'}}>
            <Header title={this.props.task.title} style={{paddingTop: 0}} />
            <Text style={{
              paddingBottom: 5,
              fontSize: 20,
              color: Colors.TextPrimary,
              fontFamily: Styles.fonts.RobotoMedium
            }}>
              {this.props.note.title}
            </Text>
            <Text style={{paddingBottom: 10}}>
              {new Date(this.props.note.createdAt).toLocaleString()}
            </Text>
            <Text style={{fontSize: 18, fontFamily: Styles.fonts.RobotoLight}}>{this.props.note.value}</Text>
          </ScrollView>
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
