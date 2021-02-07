import React from 'react'
import { LangProps } from '../i18n/en'
import Button from './Button'
import { useT } from '../i18n/index';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  img: string;
  btnTitle: LangProps;
  color?: string; 
  heart?: string;
  heartCol?: string;
  subDomain?: string;
  href: string;
}

const CardMobile = ({title, img, btnTitle, color, heart, heartCol, subDomain, href}: Props) => {

  const t = useT();

  const checkDomain = (url:string) => {
    if ( url.indexOf('//') === 0 ) { url = location.protocol + url; }
    return url.toLowerCase().replace(/([a-z])?:\/\//,'$1').split('/')[0];
  };

  const isExternal = (url:string) => {
    return ( ( url.indexOf(':') > -1 || url.indexOf('//') > -1 ) && checkDomain(location.href) !== checkDomain(url) );
  };

  return (
    <div className={subDomain + '-card-mobile'}>
      <p style={{color: color}}>{title.toLocaleUpperCase()}</p>
      {heart && <div className={subDomain + '-card-mobile-heart'} style={{background: heartCol}}>
        <img src={heart} alt='heart' />
      </div>}
      <img src={img} alt='mobile-img' />
      {isExternal(href) ? 
        <a href={href} style={{textDecoration: 'none'}} target='_blank' rel='noreferrer'>
          <Button title={t(btnTitle)} bgcolor={color} borderR='10px' margin='auto' fontSize='16px' subDomain={subDomain} />
        </a> : 
        <Link to={href} style={{textDecoration: 'none'}}>
          <Button title={t(btnTitle)} bgcolor={color} borderR='10px' margin='auto' fontSize='16px' subDomain={subDomain} />
        </Link>
      }      
    </div>
  )
}

CardMobile.defaultProps = {
  title: 'TRADE',
  img: '',
  btnTitle: 'Trade my Device',
  heart: ''
}

export default CardMobile;
