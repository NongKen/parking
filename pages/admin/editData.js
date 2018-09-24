import React from 'react'
import Link from 'next/link'
import { Table, Input, Button, Upload, Icon } from 'antd'

import firebase from '../../libs/firebase'

const rootRef = firebase.database().ref('parking')

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      table: '',
      subTitle: '',
      defaultDay: '1'
    }
    rootRef.child('password').on('value', (snapshot) => {
      const password = snapshot.val()
      this.setState({ password })
    })
    rootRef.child('table').on('value', (snapshot) => {
      const table = snapshot.val()
      this.setState({ table: JSON.stringify(table) })
    })
  }


  onUpdatePassword() {
    const password = this.state.password
    rootRef.child('password').set(password)
  }

  onUpdateTable() {
    const table = this.state.table
    const mappedTable = table.split('\n')
      .map(t => t.split('\t'))
      .map((t, i) => {
        return { id: i, a: t[0], b: t[1], c: t[2], d: t[3], e: t[4] }
      })
    rootRef.child('table').set(mappedTable)
  }

  // onUpdateSubTitle() {
  //   const subTitle = this.state.subTitle
  //   rootRef.child('/subTitle/').set(subTitle)
  // }

  // onUpdateDefaultDay() {
  //   const defaultDay = this.state.defaultDay
  //   rootRef.child('/defaultDay/').set(defaultDay)
  // }

  // onUpdateDefaultDay() {
  //   const defaultDay = this.state.defaultDay
  //   rootRef.child('/defaultDay/').set(defaultDay)
  // }

  onInput(value, type) {
    const newState = {}
    newState[type] = value
    this.setState(newState)
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Input
            style={{ width: 200, margin: 8 }}
            placeholder="user password"
            addonBefore="Password"
            value={this.state.password}
            onChange={(e) => this.onInput(e.target.value, 'password')}
          />
          <Button
            style={{ width: 150, margin: 8 }}
            onClick={() => this.onUpdatePassword()}
          >
            Set Password
          </Button>
        </div>
        <div>
          <Input.TextArea
            style={{ width: 200, margin: 8 }}
            placeholder="table Data"
            addonBefore="Table Data"
            value={this.state.table}
            onChange={(e) => this.onInput(e.target.value, 'table')}
          />
          <Button
            style={{ width: 150, margin: 8 }}
            onClick={() => this.onUpdateTable()}
          >
            Set Table
          </Button>
        </div>
      </React.Fragment>
    )
  }
}

export default Admin
