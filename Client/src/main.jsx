import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import {thunk } from "redux-thunk"
import Reducers from "./Reducers"
// import './index.css'
const store = createStore(Reducers,compose(applyMiddleware(thunk)))

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
)
