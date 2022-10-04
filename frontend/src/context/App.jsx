import React, { createContext } from 'react'
import { BrowserRouter } from 'react-router-dom';

export const App = createContext();

const AppProvider = ({children}) => {
  return (
      <App.Provider value={{}}>
          <BrowserRouter>
            {children}
          </BrowserRouter>
      </App.Provider>
  )
}

export default AppProvider