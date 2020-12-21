import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Footer, Header } from './components'
import { Home } from './pages/home/'

/* eslint-disable */
const subDomain:string = 'DeviceList'

function App(): JSX.Element {
  require(`./assets/${subDomain}/styles/index.css`);

  return (
    <div>
      <Header subDomain={subDomain} />
      <Router>
        <Route path='/' exact component={() => <Home subDomain={subDomain} />} />
        <Route path='/home' render={() => (<Redirect to="/" />)} />
      </Router>
      <Footer subDomain={subDomain} />
    </div>
  )
}

export default App;
