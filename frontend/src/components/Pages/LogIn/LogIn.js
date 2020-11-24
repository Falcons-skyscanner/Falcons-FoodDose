import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { TextField, Typography, FormControl, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import './LogIn.css'
// import Title from '../Title/title.js';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      Email: '',
      Password: '',

    }

  }
  postReq = (obj) => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch('users/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.props.setEmail(data.user.email)
          this.props.setName(data.user.name)
          localStorage.setItem('auth-rest', data.token)
          if (data.user.role === 'User') {
            localStorage.setItem('userId', data.user._id)
            this.props.setUser(data.user._id)
          }
          if(data.user.role === 'Admin'){
            localStorage.setItem('adminId', data.user._id)
            this.props.setAdmin(data.user._id)
          }
          if(data.user.role === 'Owner'){
            localStorage.setItem('ownerId', data.user._id)
            this.props.setOwner(data.user._id)
          }
          this.props.setLogin(true)
          console.log(data)
          this.props.otherProps.history.push('/')
        } else {
          alert('wrong credentials')
        }

      });
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
    // console.log(value)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.postReq(this.state)
  }

  render() {
    const { Email, Password } = this.state
    // console.log(this.props)
    return (
      <div className='login'>

        <Typography component="h1" variant="h3" align="center" id="title"> Login</Typography><br />
        <Box className='login' display="flex" justifyContent="center" alignItems="center" minHeight="40vh">

          <form onSubmit={this.handleSubmit} id="form">
            <FormControl margin="normal" id="control" >
              <TextField
                required
                id="Email"
                name="Email"
                type="email"
                value={Email}
                onChange={this.handleChange}
                label="Email" variant="outlined"
              />
            </FormControl><br />
            <FormControl margin="normal" >
              <TextField
                required
                id="Password"
                name="Password"
                type="Password"
                value={Password}
                onChange={this.handleChange}
                label="Password" variant="outlined"
              />
            </FormControl><br /><br />

            <Button id="btn"
              // onClick={this.handleSubmit}
              type="submit"
              size="large"
              variant="contained"
              onClick={this.changeState}


            >
              Login
          </Button><br /><br />

          </form>
          <Typography id="title1"> If you don't have an account ?</Typography><br />
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            <Button id="btn1"
              type="submit"
              size="large"
              variant="contained"
            >
              Signup
              </Button>
          </Link>

        </Box>

      </div >
    );
  }
}


export default Login;