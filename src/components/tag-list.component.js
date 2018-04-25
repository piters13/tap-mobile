import React from 'react'
import { StyleSheet } from 'react-native'
import { TagSelect } from 'react-native-tag-select'
import { Colors } from '../constants/colors'

export class TagList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      taskName: '',
      tagName: ''
    }
  }
  render () {
    return (
      <TagSelect
        data={this.props.tags}
        itemStyle={styles.item}
        itemLabelStyle={styles.label}
        itemStyleSelected={styles.itemSelected}
        itemLabelStyleSelected={styles.labelSelected}
      />
    )
  }
}

const styles = StyleSheet.create({
  labelText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 30
  },
  item: {
    backgroundColor: Colors.DarkGrey
  },
  label: {
    color: '#FFF'
  },
  itemSelected: {
    borderWidth: 1,
    borderColor: Colors.DarkGrey,
    backgroundColor: '#FFF'
  },
  labelSelected: {
    color: Colors.DarkGrey
  }
})
