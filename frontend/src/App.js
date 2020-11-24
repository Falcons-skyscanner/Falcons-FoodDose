import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Footer from './components/SharedComponents/Footer/footer.js';
import Header from './components/SharedComponents/Header/header.js'
import Login from '../src/components/Pages/LogIn/LogIn.js'
import SignUp from '../src/components/Pages/Signup/signUp.js';
import Home from './components/Pages/Home/home';
import Restaurants from './components/Pages/Restaurants/Restaurants'
import Menu from './components/Pages/Menu/Menu'


//My imports
import Panel from './components/Pages/Panel/Panel'


class App extends Component {
    constructor() {
        super()
        this.state = {
            userId: localStorage.getItem('userId'),
            name: '',
            email: ''
        }
    }

    componentDidMount = () => {
        this.verifyToken()
    }

    verifyToken = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-rest': localStorage.getItem('auth-rest')
            },
        };
        fetch('users/auth', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setEmail(data.email)
                this.setName(data.name)
                console.log(data)
            })
    }

    setEmail = (email) => this.setState({ email: email })
    setName = (name) => this.setState({ name: name })

    render() {
        const { name, email } = this.state
        console.log('name and email are', name + email)
        return (
            <div className="App" >
                <div>
                    <Header/>

                    <Switch>
                        <Route path="/panel" exact render={() => <Panel />} />
                        {/* <Route path="/" exact render={() => <Welcome />} /> */}
                        <Route path="/home" exact render={() => <Home />} />
                        <Route path="/login" exact render={(props) => <Login setEmail={this.setEmail} setName={this.setName} otherProps={props} />} />
                        <Route path="/signup" exact render={(props) => <SignUp setEmail={this.setEmail} setName={this.setName} otherProps={props} />} />
                        {/* <Route path="/logout" exact render={() => <Logout />} /> */}
                        <Route path="/category/:id" exact component={Restaurants} />
                        <Route path="/restaurant/:id" exact component={Menu} />
                        {/* <Route path="/" exact render={() => <categories />} /> */}
                        {/* <Route path="/category/:id" exact render={() => <Resturants />} /> */}
                    </Switch>
                    <Footer/>

                </div>
                
            </div>
        );
    }
}
export default App;