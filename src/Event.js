import React, { Component } from 'react'
import moment from 'moment'
import styled, { css } from 'styled-components'

class Event extends Component {

  state = {
    expanded: false,
    decimalView: true
  }

  showPrimaryMarket = (eventId) => {
    this.toggleExpand();
    fetch(`http://localhost:8888/sportsbook/event/${eventId}`).then(res => {
      return res.json()
    }).then(res => {
      const marketId = Object.values(res.markets)[0][0].marketId
      fetch(`http://localhost:8888/sportsbook/market/${marketId}`).then(res => {
        return res.json()
      }).then(res => {
        const outcomes = Object.values(res.outcomes)[0]
        
        this.setState({
          homePriceDecimal: parseFloat(outcomes[0].price.decimal).toFixed(2),
          drawPriceDecimal: parseFloat(outcomes[1].price.decimal).toFixed(2),
          awayPriceDecimal: parseFloat(outcomes[2].price.decimal).toFixed(2),
          homePriceFraction: `${outcomes[0].price.num}/${outcomes[0].price.den}`,
          drawPriceFraction: `${outcomes[1].price.num}/${outcomes[1].price.den}`,
          awayPriceFraction: `${outcomes[2].price.num}/${outcomes[2].price.den}`
        })
      })
    })
  }

  toggleExpand = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  toggleDecimal = () => {
    this.setState({
      decimalView: !this.state.decimalView
    })
  }

  render() {

    const { event } = this.props;
    const { 
      homePriceDecimal,
      drawPriceDecimal,
      awayPriceDecimal,
      homePriceFraction,
      drawPriceFraction,
      awayPriceFraction,
      decimalView 
    } = this.state
    return (
      <div>
        <Time>{moment(event.startTime).format('HH:mm')}</Time>
        <EventName onClick={() => this.showPrimaryMarket(event.eventId)} >{event.name}</EventName>
  
        <OddsContainer expanded={this.state.expanded}>
          <p>WIN { decimalView ? homePriceDecimal : homePriceFraction }</p>
          <p>DRAW { decimalView ? drawPriceDecimal : drawPriceFraction }</p>
          <p>WIN { decimalView ? awayPriceDecimal : awayPriceFraction }</p>
          <Icon onClick={ this.toggleDecimal } className="fas fa-exchange-alt"></Icon>
        </OddsContainer>
  
      </div>
    )
  }
}

const Time = styled.p`
  margin-right: 1em;
  font-weight: 800;
  padding: 10px;
  color: #aaa;
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
  `}
  p {
    margin: 0 10px;
  }
`
const Icon = styled.i`
  cursor: pointer;
`
export default Event
