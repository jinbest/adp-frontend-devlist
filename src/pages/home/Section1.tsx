import React, {useState, useEffect} from 'react'
import { CardMobile } from '../../components'
import { Grid, Box, Typography } from '@material-ui/core'
import { Search } from '../../components';
import { useT } from "../../i18n/index";
import { LangProps } from "../../i18n/en";
// import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles";

// const features:any[] = ['repair'];

type Props = {
  subDomain?: string;
}

const Section1 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchBarVisible, setSearchBarVisible] = useState(true);
  const t = useT();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 460) {
      setSearchBarVisible(false);
    } else {
      setSearchBarVisible(true);
    }
  }, [scrollPosition]);

  useEffect(() => {
    const headerSearch = document.getElementById('header-search') as HTMLElement;
    searchBarVisible ? headerSearch.style.visibility = 'hidden' : headerSearch.style.visibility = 'visible';
  }, [searchBarVisible])

  return (
    <section className='Container'>
      <Grid item xs={12} sm={12} className='section1-top'>
        <div className="section1-title">
          {data.homeTextData.section1.title.map((item:LangProps, index:number) => {
            return (
              <React.Fragment key={index}>
                {t(item)} <br />
              </React.Fragment>
            )
          })}
        </div>

        {/* <FeatureToggles features={features}>
          <Feature
            name='repair'
            inactiveComponent={()=><></>}
            activeComponent={()=>
              <Typography className='section1-subtitle'>
                {t(data.homeTextData.section1.subtitle)}
              </Typography>
            }
          />
        </FeatureToggles> */}

        <Typography className="section1-subtitle">
          {t(data.homeTextData.section1.subtitle)}
        </Typography>

        <Box className='sec1-search_input'>
          <Search placeholder={data.homeTextData.section1.searchPlaceholder} color='white' bgcolor={data.colorPalle.themeColor} height='60px' />
        </Box>
      </Grid>
      <Grid container item xs={12} spacing={3} className='sec1-card-mobile-data'>
        {data.cardMobileData.data.map((item:any, index:number) => {
          return (
            <Grid item xs={6} sm={6} md={data.cardMobileData.gridMD} style={{paddingTop: '0px', margin: '0 auto 5px'}} key={index}>
              <CardMobile 
                title={t(item.title)} 
                img={item.img} 
                btnTitle={item.btnTitle} 
                color={data.colorPalle.orange} 
                key={index}
                heart={index === 0 ? data.cardMobileData.heart : ''}
                heartCol={data.colorPalle.heartCol}
              />
            </Grid>
          )
        })}
      </Grid>
    </section>
  )
}

export default Section1
