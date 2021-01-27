import React, {useState} from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useT } from '../i18n/index'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      outline: 'none'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '1px solid rgba(0,0,0,0.1)',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: 'center',
      outline: 'none',
      borderRadius: '10px',
      '& .MuiFilledInput-root': {
        background: 'white'
      }
    },
    button: {
      borderRadius: '20px',
      width: '200px',
      cursor: 'pointer',
      fontSize: '15px',
      color: 'white',
      border: 'none',
      outline: 'none',
      marginTop: '10px',
      '&:hover': {
        opacity: 0.8,
        boxShadow: '0 5px 15px rgba(145, 92, 182, .4)'
      }
    },
    formRoot: {
      '& > *': {
        margin: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap',
      },
      marginBottom: '20px'
    }
  }),
);

type Props = {
  bgColor: string;
  handleUserInfo: (data:any) => void;
}

const UserInfoModal = ({bgColor, handleUserInfo}: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const t = useT();
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleClose();
    // handleUserInfo({city: 'winnipeg', state: 'MB', postCode: 'R3P1E7', country: 'CA'});
    handleUserInfo({city: city, state: state, postCode: postCode, country: country});
  };

  const handleChangeCity = (val:string) => {
    setCity(val);
  }

  const handleChangeState = (val:string) => {
    setState(val);
  }

  const handleChangePostCode = (val:string) => {
    setPostCode(val);
  }

  const handleChangeCountry = (val:string) => {
    setCountry(val);
  }

  return (
    <div>
      <button 
        className={classes.button} 
        style={{background: bgColor}}
        onClick={handleOpen}
      >
        {t('INPUT_YOUR_INFO')}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Input Your Info</h2>
            <form className={classes.formRoot} noValidate autoComplete="off">
              <TextField
                id="city"
                label={t('CITY')}
                variant="filled"
                color="secondary"
                value={city}
                onChange={(e)=>{handleChangeCity(e.target.value)}}
              />
              <TextField
                id="state"
                label={t('STATE')}
                variant="filled"
                color="secondary"
                value={state}
                onChange={(e)=>{handleChangeState(e.target.value)}}
              />
              <TextField
                id="postcode"
                label={t('POSTAL_CODE')}
                variant="filled"
                color="secondary"
                value={postCode}
                onChange={(e)=>{handleChangePostCode(e.target.value)}}
              />
              <TextField
                id="country"
                label={t('COUNTRY')}
                variant="filled"
                color="secondary"
                value={country}
                onChange={(e)=>{handleChangeCountry(e.target.value)}}
              />
            </form>
            <button 
              className={classes.button}
              style={{width: '100px', background: bgColor}}
              onClick={handleSubmit}
            >{t('SUBMIT')}</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default UserInfoModal;