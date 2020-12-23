import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Footer, Header } from './components'
import { Home } from './pages/home/'
import { Repair } from './pages/repair/'

/* eslint-disable */
const domainList:any[] = ['DeviceList', 'NorthTech'];
const subDomain:string = domainList[0]

function App(): JSX.Element {
  require(`./assets/${subDomain}/styles/index.css`);

  const BaseRouter = () => {
    return (
      <>
        <Route path='/' exact component={() => <Home subDomain={subDomain} />} />
        <Route path='/home' render={() => (<Redirect to="/" />)} />
        <Route path='/repair' exact component={() => <Repair subDomain={subDomain} />} />
      </>
    )
  }

  return (
    <Router>
      <Header subDomain={subDomain} />
      <BaseRouter />
      <Footer subDomain={subDomain} />
    </Router>
  )
}

export default App;
