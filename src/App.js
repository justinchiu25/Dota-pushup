import React from 'react'
import {Provider} from 'react-redux'
import { AuthProvider } from './App/Contexts/AuthContext'
import store from './App/Store'
import Routes from './App/Routes'

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Provider>
  )
}

export default App;