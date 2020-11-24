import React, { Component } from 'react';
import { Switch, Route, Redirect, } from "react-router-dom";
import Login from '../src/components/Pages/LogIn/LogIn.js'
import SignUp from '../src/components/Pages/Signup/signUp.js';
import Home from './components/Pages/Home/home';
import Restaurants from './components/Pages/Restaurants/Restaurants'
import Menu from './components/Pages/Menu/Menu'
import AdminPanel from './components/Pages/Panel/AdminPanel'
import Header from './components/SharedComponents/Header/header'

//My imports
import Panel from './components/Pages/Panel/Panel'


class App extends Component {
    constructor() {
        super()
        this.state = {
            userId: localStorage.getItem('userId'),
            adminId: localStorage.getItem('adminId'),
            ownerId: localStorage.getItem('ownerId'),
            name: '',
            email: '',
            login: false
        }
    }

    componentDidMount = () => {
        if (this.state.userId || this.state.adminId || this.state.ownerId) {
            this.setState({ login: true })
        }
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
                if (data.success) {
                    this.setEmail(data.email)
                    this.setName(data.name)
                    console.log(data)
                } else {
                    localStorage.removeItem('userId')
                    localStorage.removeItem('adminId')
                    this.setAdmin('')
                    this.setUser('')
                    this.setLogin(false)
                }
            })
    }

    setEmail = (email) => this.setState({ email: email })
    setName = (name) => this.setState({ name: name })
    setAdmin = (id) => this.setState({ adminId: id })
    setUser = (id) => this.setState({ userId: id })
    setOwner = (id) => this.setState({ ownerId: id })
    setLogin = (boolean) => this.setState({ login: boolean })

    render() {
        const { name, email, adminId, userId, login } = this.state
        console.log('name and email are', name + email)
        return (
            <div className="App" >
                <div>
                    <Header userId={userId} setAdmin={this.setAdmin} setOwner={this.setOwner} setUser={this.setUser} login={login} setLogin={this.setLogin} />
                    <Switch>
                        <Route path="/panel" exact render={() => <Panel />} />
                        <Route path="/" exact render={() => <Home adminId={adminId} login={login} />} />
                        <Route path="/admin" exact render={() => (adminId) ? <AdminPanel /> : <Redirect to='/' />} />
                        <Route path="/login" exact render={(props) => <Login setEmail={this.setEmail} setName={this.setName} setUser={this.setUser} setOwner={this.setOwner} setLogin={this.setLogin} setAdmin={this.setAdmin} otherProps={props} />} />
                        <Route path="/signup" exact render={(props) => <SignUp setEmail={this.setEmail} setName={this.setName} setLogin={this.setLogin} setUser={this.setUser} otherProps={props} />} />
                        <Route path="/category/:id" exact component={Restaurants} />
                        <Route path="/restaurant/:id" exact component={Menu} />

                    </Switch>

                </div>
                {/* <div className="footer">
                    <Footer />
                </div> */}
            </div>
        );
    }
}
export default App;