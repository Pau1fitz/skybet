import React, { Component } from 'react';

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

  showPrimaryMarket = (id) => {
    fetch(`http://localhost:8888/sportsbook/event/${id}`).then(res => {
      return res.json()
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Sky Bet</h1>
        {this.state.events.map(event => {
          return (
            <div key={event.name}>
              <p onClick={ () => this.showPrimaryMarket(event.eventId) }>{event.name}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
