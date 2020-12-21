import React, {useState, useEffect} from 'react'
import { CardMobile } from '../../components'
import { Grid, Box, Typography } from '@material-ui/core'
import { Search } from '../../components';

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Section1 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchBarVisible, setSearchBarVisible] = useState(true);

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
  }, [scrollPosition])

  useEffect(() => {
    const headerSearch = document.getElementById('header-search') as HTMLElement;
    searchBarVisible ? headerSearch.style.visibility = 'hidden' : headerSearch.style.visibility = 'visible';
  }, [searchBarVisible])

  return (
    <section className='Container'>
      <Grid item xs={12} sm={12} className="section1-top">
        <Typography className="section1-title">
          Trade, repair, buy or sell <br />
          your mobile device
        </Typography>
        <Typography className="section1-subtitle">
          Winnipeg's mobile device specialists
        </Typography>
        <Box className='sec1-search_input'>
          <Search color='white' bgcolor='#054DFA' height='60px' />
        </Box>
      </Grid>
      <Grid container item xs={12} spacing={3}>
        {data.cardMobileData.map((item:any, index:number) => {
          return (
            <Grid item xs={6} sm={6} md={3} style={{paddingTop: '0px', marginBottom: '20px'}} key={index}>
              <CardMobile title={item.title} img={item.img} btnTitle={item.btnTitle} color={data.colorPalle.orange} key={index}/>
            </Grid>
          )
        })}
      </Grid>
    </section>
  )
}

export default Section1
