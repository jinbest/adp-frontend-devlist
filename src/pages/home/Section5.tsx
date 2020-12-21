import React from 'react';
import {Button} from '../../components'
import { Typography, Box } from '@material-ui/core';

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Section5 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  const bounceData = data.bounceData;
  
  return (
    <section className='sec5-Back'>
      <Box className='Container sec5-container'>
        <Typography className='f40 bold mg-t-1'>{bounceData.title}</Typography>
        <Typography className='f18'>{bounceData.content}</Typography>
        <img className='mg-t-1 section5-img' src={bounceData.img} />
        <Typography className='f24 bold'>{bounceData.subtitle}</Typography>
        <Box className='col_center'>
          <ul>
            <Typography>{bounceData.subcontent}</Typography>
            {bounceData.subcontentData.map((item:any, index:number) => {
              return (
                <li key={index}><span className='dot'>&nbsp;&bull;&nbsp;</span>{item}</li>
              )
            })}
          </ul>
        </Box>
        <Box className='sec5-button'>
          <Button title={bounceData.btnTitle} bgcolor='#054DFA' borderR='20px'/>
        </Box>
      </Box>
    </section>
  )
}

export default Section5;
