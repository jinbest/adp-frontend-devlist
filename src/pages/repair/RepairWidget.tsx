import React, {useState, useEffect} from 'react'
import { ChooseDevice, BackSVG } from './widget-component'
// import { Grid, Typography } from '@material-ui/core'

const stepList:string[] = [
  'deviceBrand',
  'deviceModel',
  'deviceRepairs',
  'repairAnotherDevice',
  'dropOffDevicce',
  'receiveQuote',
  'contactDetails',
  'bookTime',
  'usefulInfo',
  'thankyouMobile'
]

/* eslint-disable */
type Props = {
  subDomain: string;
  handleStatus: (status:boolean) => void;
}

const RepairWidget = ({subDomain, handleStatus}: Props) => {
  const mockData = require(`../../assets/${subDomain}/mock-data/mockData.js`)

  const [step, setStep] = useState(0)
  const [data, setData] = useState(mockData.repairWidget[stepList[step]])

  useEffect(() => {
    setData(mockData.repairWidget[stepList[step]]);
  }, [step])

  useEffect(() => {
    handleStatus(false)
  }, [])

  const handleStep = (i:number) => {
    setStep(i)
  }

  const handleBackStep = () => {
    setStep(step-1)
    setData(mockData.repairWidget[stepList[step-1]])
  }

  return (
    <div className='repair-widget Container'>
      {step > 0 && 
        <div className='back-to-top' onClick={handleBackStep}>
          <BackSVG color='#BDBFC3' />
        </div>
      }
      {(step <= 5) && 
        <ChooseDevice data={data} handleStep={handleStep} stepName={stepList[step]} step={step} subDomain={subDomain} />
      }
    </div>
  )
}

export default RepairWidget
