import React, {useState, useEffect} from 'react'
import { Card, PlusSVG } from './'
import { Grid, Typography } from '@material-ui/core'
import { Search, Button } from '../../../components'

/* eslint-disable */
type Props = {
  data: any;
  stepName: string;
  step: number;
  subDomain?: string;
  handleStep: (step:number) => void;
}

type ArrayProps = {
  array: any[];
}

const ChooseDevice = ({data, stepName, step, subDomain, handleStep}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`)
  const themeCol = mainData.colorPalle.themeColor

  const [sliceNum, setSliceNum] = useState(5)
  const [plusVisible, setPlusVisible] = useState(true)
  const [itemTypes, setItemTypes] = useState<ArrayProps[]>([])
  const [estimatedTimes, setEstimatedTimes] = useState<ArrayProps[]>([])

  const handlePlus = () => {
    setSliceNum(data.images.length)
    setPlusVisible(false)
  }

  const ChooseNextStep = () => {
    handleStep(step+1)
  }

  useEffect(() => {
    if (stepName === 'deviceRepairs' || stepName === 'dropOffDevicce' || stepName === 'receiveQuote') {
      setItemTypes(data.types)
    }
  }, [step, data, stepName])

  const toggleItemTypes = (i:number) => {
    let cntTypes:any[] = itemTypes
    if (cntTypes[i].bg === 'white') {
      cntTypes[i].bg = themeCol
      cntTypes[i].col = 'white'
    } else {
      cntTypes[i].bg = 'white'
      cntTypes[i].col = 'black'
    }
    setItemTypes([...cntTypes])
  }

  useEffect(() => {
    let cntArray:any[] = [], cntTypes:any[] = itemTypes
    if(cntTypes && stepName === 'deviceRepairs') {
      for (let i = 0; i < cntTypes.length; i++) {
        if (cntTypes[i].bg === themeCol) {
          cntArray.push({ name: cntTypes[i].name, estimate: cntTypes[i].estimate })
        }
      }
      setEstimatedTimes([...cntArray])
    }
  }, [itemTypes])

  return (
    <div>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography className="repair-widget-title">
            {data.title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <div className='repair-choose-device-container'>
              {step < 3 && <div style={{width: '95%'}}>
                <Search 
                  color='rgba(0,0,0,0.8)' 
                  bgcolor='white' 
                  border='rgba(0,0,0,0.2)'
                  placeholder={data.placeholder}
                />
              </div>}
              <div className='widget-main-container'>

                {(stepName === 'deviceBrand') && <>
                  {data.images.slice(0,sliceNum).map((item:any, index:number) => {
                    return (
                      <div className='device-item-container' key={index} onClick={ChooseNextStep}>
                        <img src={item.img} style={{maxWidth: '80%'}} />
                      </div>
                    )
                  })}
                  {plusVisible && <div className='device-item-container' onClick={handlePlus}>
                    <PlusSVG color='#BDBFC3' />
                  </div>}
                </>}

                {(stepName === 'deviceModel') && <>
                  {data.images && data.images.map((item:any, index:number) => {
                    return (
                      <div className='device-item-container' key={index} onClick={ChooseNextStep}>
                        <div className='device-model-item'>
                          <p className='device-brand-subtitle'>{item.name}</p>
                          <img src={item.img} />
                        </div>
                      </div>
                    )
                  })}
                  <div className='device-item-container'>
                    <PlusSVG color='#BDBFC3' />
                  </div>
                </>}

                {(stepName === 'repairAnotherDevice') && 
                  <div className='repair-another-device'>
                    <Button title='Yes' bgcolor='white' borderR='20px' width='120px' height='30px' fontSize='17px' txcolor='black' onClick={ChooseNextStep} />
                    <Button title='No' bgcolor='white' borderR='20px' width='120px' height='30px' fontSize='17px' txcolor='black' onClick={ChooseNextStep} />
                  </div>
                }

                {(stepName === 'deviceRepairs' || stepName === 'dropOffDevicce' || stepName === 'receiveQuote') && 
                  <>
                    {itemTypes && itemTypes.map((item:any, index:number) => {
                      return (
                        <div 
                          className='device-item-container' 
                          key={index} 
                          style={{backgroundColor: item.bg}} 
                          onClick={() => toggleItemTypes(index)}
                        >
                          <div className='device-repair-item'>
                            <p style={{ color: item.col }}>{item.name}</p>
                          </div>
                        </div>
                      )
                    })}
                  </>
                }

              </div>              
            </div>

            {(stepName === 'deviceRepairs' || stepName === 'dropOffDevicce' || stepName === 'receiveQuote') && 
              <div className='repair-card-button'>
                <Button 
                  title='Next' 
                  bgcolor={themeCol} 
                  borderR='20px' 
                  width='120px' 
                  height='30px' 
                  fontSize='17px' 
                  onClick={ChooseNextStep}
                />
                <p>or press ENTER</p>
              </div>
            }
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card className='customized-card-height'>

            {step < 2 && <div className='repair-choose-device-container'>
              <Typography className='topic-title'>{data.mainTopic.title}</Typography>
              {data.mainTopic.content && data.mainTopic.content.map((item:any, index:number) => {
                return (
                  <Typography className='topic-content' key={index}>{item}</Typography>
                )
              })}
              {data.disableTopic.title && <Typography className='topic-title' style={{color: 'rgba(0,0,0,0.3)'}}>
                {data.disableTopic.title}
              </Typography>}
              {data.disableTopic.content && <Typography className='topic-content' style={{color: 'rgba(0,0,0,0.3)'}}>
                {data.disableTopic.content}
              </Typography>}
            </div>}

            {step === 2 && <div className='repair-choose-device-container'>
              <Typography className='topic-title'>{data.mainTopic.title}</Typography>
              {estimatedTimes && estimatedTimes.map((item:any, index:number) => {
                return (
                  <div key={index} className='estimate-times-div'>
                    <p className='estimate-title'>{item.name}</p>
                    <p className='estimate-content'>{item.estimate}</p>
                  </div>
                )
              })}
            </div>}

            {step === 3 && 
              <div className='repair-choose-device-container'>
                <Typography className='topic-title'>{data.mainTopic.title}</Typography>
                <Typography className='topic-content'>{data.mainTopic.content}</Typography>
              </div>
            }

            {(stepName === 'dropOffDevicce' || stepName === 'receiveQuote') && 
              <div className='repair-choose-device-container'>
                <Typography className='topic-title'>{data.mainTopic.title}</Typography>
                {data.mainTopic.content && data.mainTopic.content.map((item:any, index:number) => {
                  return (
                    <div key={index} style={{border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', padding: '10px', marginBottom: '10px', display: 'flex'}}>
                      <div style={{marginRight: '10px'}}><img src={item.img} /></div>
                      <div>
                        <Typography className='repair-summary-title'>{item.subtitle}</Typography>
                        <Typography className='repair-summary-service'>{item.service}</Typography>
                        {item.details.map((i:any, k:number) => {
                          return (
                            <p key={k}>{i}</p>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            }

          </Card>
        </Grid>
      </Grid>      
    </div>
  )
}

export default ChooseDevice
