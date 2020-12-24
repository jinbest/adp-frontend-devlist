import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Footer, Header } from './components'
import { Home } from './pages/home/'
import { Repair, RepairWidget } from './pages/repair/'

/* eslint-disable */
const domainList:any[] = ['devicelist', 'northtech'];
const subDomain:string = domainList[0]

function App(): JSX.Element {
  require(`./assets/${subDomain}/styles/index.css`);

  const [footerStatus, setFooterStatus] = useState(true);

  const handleFooterStatus = (status:boolean) => {
    setFooterStatus(status);
  }

  const BaseRouter = () => {
    return (
      <>
        <Route path='/' exact component={() => <Home subDomain={subDomain} />} />
        <Route path='/home' render={() => (<Redirect to="/" />)} />
        <Route path='/repair' exact component={() => <Repair subDomain={subDomain} handleStatus={handleFooterStatus} />} />
        <Route path='/repair-widget' exact component={() => <RepairWidget subDomain={subDomain} handleStatus={handleFooterStatus} />} />
      </>
    )
  }

  return (
    <Router>
      <Header subDomain={subDomain} handleStatus={handleFooterStatus} />
      <BaseRouter />
      {footerStatus && <Footer subDomain={subDomain} />}
    </Router>
  )
}

export default App;
