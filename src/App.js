import React, { Component } from 'react';

class App extends Component {

  state = {
    events: []
  }

  componentDidMount() {
    fetch('http://localhost:8888/football/live').then(res => {
      return res.json()
    }).then(res => {
      console.log(res)
      this.setState({
        events: res.events
      })
    })
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Sky Bet</h1>
        {this.state.events.map((event, index) => {
          return (
            <div key={event.name}>
              {
                index != 0 && this.state.events[index].typeName != this.state.events[index - 1].typeName && (
                  <h1>{event.typeName}</h1>
                )
              }
              { index == 0 && <h1>{event.typeName}</h1> }
              <p>{event.name}</p>
              
            </div>
          )
        })}
      </div>
    );
  }
}


export default App;
