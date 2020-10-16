import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Rules from './Rules';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  
  buttons:{
   color:'#F2C17D',
   fontWeight:'bold',
   textDecoration:'none'
  },
  
  link:{
    textDecoration:'none',
    color:'#F2C17D',
    fontWeight:'bold'
  }
}));

export default function BasicButtonGroup() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ButtonGroup variant="text"aria-label="text primary button group" size="large">
        <Button  className={classes.buttons} > <Link className={classes.link} to="/">HomePage</Link></Button>
        <Button  className={classes.buttons} > <Rules/> </Button> 
      </ButtonGroup>
    </div>
  );
}
