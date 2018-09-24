import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Cookies from 'js-cookie'

import { Table, Input, Button, Spin, Icon } from 'antd'
import { Context, Container, FullBackground } from '../components/baseComponents'
import firebase from '../libs/firebase'

const rootRef = firebase.database().ref('parking')

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const InputError = styled.div`
  color: red;
`


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

const columns = [{
  title: 'A',
  dataIndex: 'a',
  width: 120
}, {
  title: 'B',
  dataIndex: 'b',
  width: 120
}, {
  title: 'C',
  dataIndex: 'c',
  width: 80
}, {
  title: 'D',
  dataIndex: 'd',
  width: 200
}, {
  title: 'E',
  dataIndex: 'e',
  width: 100
}];


class Home extends React.Component {  
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      password: '',
      verified: false,
      loginError: false,
      table: []
    }


    rootRef.child('table').on('value', (snapshot) => {
      const table = snapshot.val()
      this.setState({ table })
    })
  }

  async componentWillMount() {
    const snapshot = await rootRef.child('password').once('value')
    const password = Cookies.get('pkId')
    if (password == snapshot.val()) {
      this.setState({ verified: true, loginError: false, loading: false })
    }
    this.setState({ loading: false })
  }

  onInput(value, type) {
    const newState = {}
    newState[type] = value
    this.setState(newState)
  }

  async onLogin() {
    const snapshot = await rootRef.child('password').once('value')
    if (this.state.password == snapshot.val()) {
      Cookies.set('pkId', snapshot.val(), { expires: 7 })
      this.setState({ verified: true, loginError: false })
    } else {
      this.setState({ loginError: true })
    }
  }

  
  render() {
    if (this.state.loading) {
      return (
        <Context>
          <Container>
            <InputWrapper>
              <Spin indicator={antIcon} />
            </InputWrapper>
          </Container>
        </Context>
      )
    }
    if (!this.state.verified) {
      return (
        <FullBackground color="white">
          <Context>
            <Container>
              <InputWrapper>
                {
                  this.state.loginError && (
                    <InputError
                      style={{ width: 200, margin: 8 }}
                    >
                      error
                    </InputError>
                  )
                }
                <Input
                  style={{ width: 200, margin: 8 }}
                  type="password"
                  placeholder="password"
                  onChange={(e) => this.onInput(e.target.value, 'password')}
                />
                <Button
                  style={{ width: 200, margin: 8 }}
                  onClick={() => this.onLogin()}
                >
                  Login
                </Button>
              </InputWrapper>
            </Container>
          </Context>
        </FullBackground>
      ) 
    }
    return (
      <FullBackground color="white">
        <Context>
          <Container>
            <Table
              dataSource={this.state.table}
              columns={columns}
              rowKey="id"
              bordered
              pagination={false}
              scroll={{ y: true }}
            />
          </Container>
        </Context>
      </FullBackground>
    )
  }
}

export default Home
