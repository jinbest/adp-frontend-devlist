import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import {Logo} from '../components';
import { useT } from '../i18n/index';

type Props = {
  subDomain?: string;
}

const Footer = ({subDomain}: Props) => {
  const data = require(`../assets/${subDomain}/Database`);
  const footerLink = data.homeTextData.footer.footerLink;
  const gridVal = data.homeTextData.footer.gridVal;
  const t = useT();

  return (
    <footer className='footer'>
      <Typography className='footer-title' style={{color: data.homeTextData.footer.title.color}}>
        {t(data.homeTextData.footer.title.text)}
      </Typography>
      <Box className='footer-container'>
        <Grid item container xs={12}>
          <Grid item xs={12} md={gridVal.mainGrid[0]}>
            <Grid item container xs={12}>
              <Grid item xs={12} md={gridVal.subGrid[0]}>
                <Logo subDomain={subDomain} type='footer' handleStatus={()=>{console.log('logo clicked')}} />
                <div className='footer-subContent-title'>
                  {t(data.homeTextData.footer.contentSubTitle)}
                </div>
                <div className='device-list-grid'>
                  {data.homeTextData.footer.content[0]}
                </div>
              </Grid>
              {data.homeTextData.footer.subContent[0].title && <Grid item xs={12} md={gridVal.subGrid[1]}>
                {data.homeTextData.footer.subContent.map((item:any, index:number) => {
                  return (
                    <React.Fragment key={index}>
                      <div className='footer-subContent-title'>
                        {t(item.title)}
                      </div>
                      <div className='device-list-grid'>
                        {t(item.content)}
                      </div>
                    </React.Fragment>
                  )
                })}
              </Grid>}
              <div className='device-list-grid'>
                {t(data.homeTextData.footer.content[1])}
              </div>
            </Grid>            
          </Grid>
          <Grid item xs={12} md={gridVal.mainGrid[1]}>
            <Grid item container xs={12}>
              {
                footerLink.map((links:any, index:number) => 
                  <Grid item xs={12} sm={3} key={index}>
                    <ul className='footer_link'>
                      <li className='link_name'>{t(links.name)}</li>
                      {
                        links.lists.map((link:any, i:number) => 
                        <li key={i} className='links'>
                          <a href={link.href}>{t(link.text)}</a>
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
                {data.footerImageData.bell && <img src={data.footerImageData.bell} className='footer-device-response'/>}
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
                {data.footerImageData.bell && <img src={data.footerImageData.bell} className='footer-device-list'/>}
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Box className='footer-container-special'>
        <Grid item container xs={12} className='special-footer'>
          <Grid item xs={12} md={4}>
            <Logo subDomain={subDomain} type='footer' handleStatus={()=>{console.log('logo clicked')}} />
            <div className='device-list-grid'>
              <div>{data.homeTextData.footer.content[0]}</div>
              <div className='footer-special-content'>{t(data.homeTextData.footer.content[1])}</div>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
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
