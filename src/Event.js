import React, { Component } from 'react'
import moment from 'moment'
import styled, { css } from 'styled-components'

class Event extends Component {

  state = {
    homePrice: '',
    awayPrice: '',
    drawPrice: '',
    expanded: false
  }

  showPrimaryMarket = (eventId) => {
    fetch(`http://localhost:8888/sportsbook/event/${eventId}`).then(res => {
      return res.json()
    }).then(res => {
      const marketId = Object.values(res.markets)[0][0].marketId
      fetch(`http://localhost:8888/sportsbook/market/${marketId}`).then(res => {
        return res.json()
      }).then(res => {
        const outcomes = Object.values(res.outcomes)[0]
        console.log('outcomes ===> ', outcomes)
        this.setState({
          homePrice: parseFloat(outcomes[0].price.decimal).toFixed(3),
          drawPrice: parseFloat(outcomes[1].price.decimal).toFixed(3),
          awayPrice: parseFloat(outcomes[2].price.decimal).toFixed(3)
        })
      })
    })
  }

  toggleExpand = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {

    const { event } = this.props;
    const { homePrice, drawPrice, awayPrice } = this.state
    return (
      <div onClick={ this.toggleExpand }>
        <Time>{moment(event.startTime).format('HH:mm')}</Time>
        <EventName onClick={() => this.showPrimaryMarket(event.eventId)} >{event.name}</EventName>
  
        <OddsContainer expanded={this.state.expanded}>
          <p>WIN { homePrice }</p>
          <p>DRAW { drawPrice }</p>
          <p>WIN { awayPrice }</p>
        </OddsContainer>
  
      </div>
    )
  }
}

const Time = styled.p`
  margin-right: 1em;
  font-weight: 800;
  padding: 10px;
`
const EventName = styled.p`
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
`
const OddsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  transform: scaleY(0);
  padding: 0;
  overflow: hidden;
  transition: all 0.2s;
  ${ props => props.expanded && css`
    transform: scaleY(1);
    padding: 15px 0;
  `};

  p {
    margin: 0 10px;
  }
`

export default Event;
