import React from 'react';
import { Grid, Box } from '@material-ui/core';
import {Logo} from '../components'

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Footer = ({subDomain}: Props) => {
  const data = require(`../assets/${subDomain}/Database`);
  const footerLink = data.footerLink
  return (
    <footer className='footer'>
      <Box className='footer-container'>
        <Grid item container xs={12}>
          <Grid item xs={12} md={5}>
            <Logo subDomain={subDomain} type='footer' />
            <div className='device-list-grid'>
              <div>
                Canada's mibile device marketplace 
                (204) 221-5898 | sales@devicelist.co 
                2020 Corydon Ave, Unit F Winnipe, MB
              </div>
              <div>
                @ 2020 DeviceList 1.0.2. All Rigths Reserved. <br />
                All trademarks are properties of their respective holders. 11253913 Canada Inc. o/a 
                "DeviceList" does not own or make claim to those trademarks used on this website in 
                which it is not the holder.
              </div>
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
