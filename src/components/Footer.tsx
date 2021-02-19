import React, {useState, useEffect} from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import {Logo} from '../components';
import { useT, T } from '../i18n/index';
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles";
import { phoneFormatString } from "./Header"
import { storesDetails } from "../store"

type Props = {
  subDomain?: string;
  features: any[];
}

const Footer = ({subDomain, features}: Props) => {
  const data = require(`../assets/${subDomain}/Database`);
  // const footerLink = data.homeTextData.footer.footerLink;
  const gridVal = data.homeTextData.footer.gridVal;
  const t = useT();

  const [feats, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    const cntFeatures:any[] = [];
    for (let i = 0; i < features.length; i++) {
      if (features[i].isActive) {
        cntFeatures.push(features[i].flag);
      }
    }
    setFeatures(cntFeatures);
  }, [features])

  return (
    <footer className={subDomain + '-footer'}>
      <Typography className={subDomain + '-footer-title'} style={{color: data.homeTextData.footer.title.color}}>
        {t(data.homeTextData.footer.title.text)}
      </Typography>
      <Box className={subDomain + '-footer-container'}>
        <Grid item container xs={12}>
          {/* <Grid item xs={12} md={gridVal.mainGrid[0]}> */}<Grid item xs={12} md={12}>
            <Grid item container xs={12}>
              {/* <Grid item xs={12} md={gridVal.subGrid[0]}> */}<Grid item xs={12} md={12}>
                <Logo subDomain={subDomain} type='footer' handleStatus={()=>{console.log('logo clicked')}} />
                <div className={subDomain + '-footer-subContent-title'}>
                  {t(data.homeTextData.footer.contentSubTitle)}
                </div>
                <div className={subDomain + '-device-list-grid'}>
                  <a href={`tel:${storesDetails.storesDetails.phone}`} style={{textDecoration: 'none', color: 'black'}}>
                    {phoneFormatString(storesDetails.storesDetails.phone)} |
                  </a>&nbsp;
                  <a href={`mailto:${storesDetails.storesDetails.email}`} style={{textDecoration: 'none', color: 'black'}}>
                    {storesDetails.storesDetails.email + ' '}
                  </a>
                </div>
                <div className={subDomain + '-device-list-grid'}>{data.homeTextData.footer.content[0]}</div>
              </Grid>
              {/* {data.homeTextData.footer.subContent[0].title && <Grid item xs={12} md={gridVal.subGrid[1]}>
                {data.homeTextData.footer.subContent.map((item:any, index:number) => {
                  return (
                    <React.Fragment key={index}>
                      <div className={subDomain + '-footer-subContent-title'}>
                        {t(item.title)}
                      </div>
                      <div className={subDomain + '-device-list-grid'}>
                        <a href={`tel:${t(item.content).split("|")[0]}`} style={{textDecoration: 'none', color: 'black'}}>
                          {t(item.content).split("|")[0]}
                        </a> |
                        <a href={`mailto:${t(item.content).split("|")[1].split(" ")[1]}`} style={{textDecoration: 'none', color: 'black'}}>
                          {t(item.content).split("|")[1]}
                        </a>
                      </div>
                    </React.Fragment>
                  )
                })}
              </Grid>} */}
              <div className={subDomain + '-device-list-grid copyright'} style={{color: 'grey'}}>
                <T id={data.homeTextData.footer.content[1]} data={storesDetails.storesDetails.name} />
              </div>
            </Grid>            
          </Grid>
          <Grid item xs={12} md={gridVal.mainGrid[1]}>
            {/* <Grid item container xs={12}>
              {
                footerLink.map((links:any, index:number) => 
                  <Grid item xs={12} sm={3} key={index}>
                    <ul className={subDomain + '-footer_link'}>
                      <li className={subDomain + '-link_name'}>{t(links.name)}</li>
                      {
                        links.lists.map((link:any, i:number) => 
                        <li key={i} className={subDomain + '-links'}>
                          <a href={link.href}>{t(link.text)}</a>
                        </li>
                        )
                      }
                    </ul>
                  </Grid>     
                )
              }
            </Grid> */}
            <FeatureToggles features={feats}>
              <Feature
                name={'FRONTEND_ONLINE_PURCHASE'}
                inactiveComponent={()=><></>}
                activeComponent={()=>
                  <div className={subDomain + "-footer-images-div"}>
                    <div>
                      <img src={data.footerImageData.deviceList} className={subDomain + '-footer-device-response'}/>
                      {data.footerImageData.bell && <img src={data.footerImageData.bell} className={subDomain + '-footer-device-response'}/>}
                    </div>
                    <div>
                      <img src={data.footerImageData.buyNow} className={subDomain + '-footer-buynow'}/>
                      {data.footerImageData.others.map((item:any, index:number) => {
                        return (
                          <div className={subDomain + "-footer-others"} key={index}>
                            <img src={item} key={index} />
                          </div>
                        )
                      })}
                      <img src={data.footerImageData.deviceList} className={subDomain + '-footer-device-list'}/>
                      {data.footerImageData.bell && <img src={data.footerImageData.bell} className={subDomain + '-footer-device-list'}/>}
                    </div>
                  </div>
                }
              />
            </FeatureToggles>
          </Grid>
        </Grid>
      </Box>
      <Box className={subDomain + '-footer-container-special'}>
        <Grid item container xs={12} className={subDomain + '-special-footer'}>
          <Grid item xs={12} md={12}>
            <Logo subDomain={subDomain} type='footer' handleStatus={()=>{console.log('logo clicked')}} />
            <div className={subDomain + '-device-list-grid'}>
              <div className={subDomain + '-device-list-grid'}>
                <a href={`tel:${storesDetails.storesDetails.phone}`} style={{textDecoration: 'none', color: 'black'}}>
                  {phoneFormatString(storesDetails.storesDetails.phone)} |
                </a>&nbsp;
                <a href={`mailto:${storesDetails.storesDetails.email}`} style={{textDecoration: 'none', color: 'black'}}>
                  {storesDetails.storesDetails.email}
                </a>
              </div>
              <div className={subDomain + '-device-list-grid'}>{data.homeTextData.footer.content[0]}</div>
              <div className={subDomain + '-device-list-grid copyright'} style={{color: 'grey'}}>
                <T id={data.homeTextData.footer.content[1]} data={storesDetails.storesDetails.name} />
              </div>
            </div>
          </Grid>
          <FeatureToggles features={feats}>
            <Feature
              name={'FRONTEND_ONLINE_PURCHASE'}
              inactiveComponent={()=><></>}
              activeComponent={()=>
                <Grid item xs={12} md={8}>
                  <div className={subDomain + "-footer-images-div"}>
                    <div>
                      <img src={data.footerImageData.deviceList} className={subDomain + '-footer-device-response'}/>
                    </div>
                    <div>
                      <img src={data.footerImageData.buyNow} className={subDomain + '-footer-buynow'}/>
                      {data.footerImageData.others.map((item:any, index:number) => {
                        return (
                          <div className={subDomain + "-footer-others"} key={index}>
                            <img src={item} key={index} />
                          </div>
                        )
                      })}
                      <img src={data.footerImageData.deviceList} className={subDomain + '-footer-device-list'}/>
                    </div>
                  </div>
                </Grid>
              }
            />
          </FeatureToggles>
        </Grid>
      </Box>
    </footer>
  )
}

export default Footer;
