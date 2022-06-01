import React from 'react'
import {Provider} from 'react-redux'

import store from './App/Store'
import Routes from './App/Routes'

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

export default App;