import React, { Component } from 'react';

import Button from "@material-ui/core/Button";
import { TextField, Typography, FormControl } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import './signUp.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            Password: '',
            Email: ''
        }
    }

    postReq = (obj) => {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('http://localhost:5000/users/signup', requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('auth-rest', data.token)
                localStorage.setItem('userId', data.user._id)
                this.props.setEmail(data.user.email)
                this.props.setName(data.user.name)

                this.props.setUser(data.user.user._id)
                this.props.setLogin(true)
                console.log(data)
                this.props.otherProps.history.push('/')
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
        const { UserName, Password, Email } = this.state
        return (
            <div >

                <Typography component="h1" variant="h3" align="center" id="title"> Signup</Typography><br />
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">

                    <form onSubmit={this.handleSubmit} >
                        <FormControl margin="normal" id="input" >
                            <TextField
                                required
                                id="UserName"
                                name="UserName"
                                value={UserName}
                                onChange={this.handleChange}
                                label="UserName" variant="outlined"

                            />
                        </FormControl><br />
                        <FormControl margin="normal" >
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
                            <Button id="btn"
                                type="submit"
                                size="large"
                                variant="contained"

                            >
                                Signup</Button>
                        </FormControl><br /><br />

                    </form>

                </Box>

            </div>
        );
    }
}

export default SignUp;


