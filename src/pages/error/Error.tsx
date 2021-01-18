import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useT } from '../../i18n/index';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textAlign: 'center', 
      marginTop: '350px',
      marginBottom: '100px'
    },
    title: {
      fontSize: '50px', 
      padding: '0 50px 50px'
    },
    button: {
      fontSize: '30px',
      padding: '5px 30px',
      backgroundColor: '#666',
      color: 'white',
      borderRadius: '50px',
      textDecoration: 'none',
      outline: 'none',
      "&:hover": {
        backgroundColor: '#333'
      }
    }
  }),
);

const Error = () => {
  const classes = useStyles();
  const t = useT();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>
        {t('ERROR_TITLE')}
      </h1>
      <a href='/' className={classes.button}>{t('ERROR_BUTTON')}</a>
    </div>
  )
}

export default Error;
