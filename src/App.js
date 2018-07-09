import React, { Component } from 'react'
import styled from 'styled-components'
import Event from './Event'

class App extends Component {

  state = {
    events: []
  }

  componentDidMount() {
    fetch('http://localhost:8888/football/live').then(res => {
      return res.json()
    }).then(res => {
      this.setState({
        events: res.events
      })
    })
  }

  render() {
    return (
      <AppContainer>
        {this.state.events.map((event, index) => {
          return (
            <div key={event.name}>
              {
                index !== 0 && this.state.events[index].typeName !== this.state.events[index - 1].typeName && (
                  <HeaderText>{event.typeName}</HeaderText>
                )
              }
              { index === 0 && <HeaderText>{event.typeName}</HeaderText> }
              <EventContainer>
                <Event event={event} />
              </EventContainer>
            </div>
          )
        })}
      </AppContainer>
    )
  }
}

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const EventContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #eee;
`
const HeaderText = styled.h1`
  font-size: 16px;
`

export default App
