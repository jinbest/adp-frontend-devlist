import React from 'react';
import {Button} from '../../components'
import { Typography, Box } from '@material-ui/core';
import { useT } from '../../i18n/index';
import {LangProps} from '../../i18n/en';

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Section5 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  const bounceData = data.homeTextData.section5;
  const t = useT();

  return (
    <section className='sec5-Back'>
      <Box className='Container sec5-container'>
        <Typography className='f40 bold mg-t-1'>{t(bounceData.title)}</Typography>
        <Typography className='f18'>{t(bounceData.content)}</Typography>
        <img className='mg-t-1 section5-img' src={bounceData.img} />
        <Typography className='f24 bold'>{t(bounceData.subtitle)}</Typography>
        <Box className='col_center'>
          <ul>
            <Typography className='protect-content'>{t(bounceData.subcontent)}</Typography>
            {bounceData.subcontentData.map((item:LangProps, index:number) => {
              return (
                <li key={index} className='protect-content'><span className='dot'>&nbsp;&bull;&nbsp;</span>{t(item)}</li>
              )
            })}
          </ul>
        </Box>
        <Box className='sec5-button'>
          <Button title={bounceData.btnTitle} bgcolor={data.colorPalle.themeColor} borderR='20px'/>
        </Box>
      </Box>
    </section>
  )
}

export default Section5;
