import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import {Logo} from '../components'

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Footer = ({subDomain}: Props) => {
  const data = require(`../assets/${subDomain}/Database`);
  const footerLink = data.homeTextData.footer.footerLink
  return (
    <footer className='footer'>
      <Typography className='footer-title' style={{color: data.homeTextData.footer.title.color}}>
        {data.homeTextData.footer.title.text}
      </Typography>
      <Box className='footer-container'>
        <Grid item container xs={12}>
          <Grid item xs={12} md={5}>
            <Logo subDomain={subDomain} type='footer' handleStatus={()=>{}} />
            <div className='device-list-grid'>
              {data.homeTextData.footer.content.map((item:any, index:number) => {
                return (
                  <div key={index}>{item}</div>
                )
              })}
            </div>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid item container xs={12}>
              {
                footerLink.map((links:any, index:number) => 
                  <Grid item xs={12} sm={3} key={index}>
                    <ul className='footer_link'>
                      <li className='link_name'>{links.name}</li>
                      {
                        links.lists.map((link:any, i:number) => 
                        <li key={i} className='links'>
                          <a href={link.href}>{link.text}</a>
                        </li>
                        )
                      }
                    </ul>
                  </Grid>     
                )
              }
            </Grid>
            <div className="footer-images-div">
              <div>
                <img src={data.footerImageData.deviceList} className='footer-device-response'/>
              </div>
              <div>
                <img src={data.footerImageData.buyNow} className='footer-buynow'/>
                {data.footerImageData.others.map((item:any, index:number) => {
                  return (
                    <div className="footer-others" key={index}>
                      <img src={item} key={index} />
                    </div>
                  )
                })}
                <img src={data.footerImageData.deviceList} className='footer-device-list'/>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </footer>
  )
}

export default Footer;
