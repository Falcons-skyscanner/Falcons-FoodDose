import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BasicButtonGroup() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
      <Link to='/login'><Button> Login </Button></Link> 
      <Link to='/signup'><Button> SignUp</Button></Link> 
      <Link to='/admin'><Button> Go to admin Panel </Button></Link>  
      <Link to='/login'><Button> Login </Button></Link> 
      <Link to='/login'><Button> Login </Button></Link> 
      
        

      </ButtonGroup>
      
    </div>
  );
}
