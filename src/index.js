import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { injectGlobal } from 'styled-components';

injectGlobal`
  * {
    box-sizing: border-box;
  }

  body, p {
    margin: 0;
  }
`;

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
