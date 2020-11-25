import { Button } from '@material-ui/core'
import React from 'react'
import AdminProfile from './AdminProfile'
import AdminStatus from './AdminStatus'



class AdminPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reqUsers: [],
            userCount : 0,
            restCount : 0,
            catCount : 0
        }
    }

    componentDidMount = () => {
        this.getUsers()
        this.getAllUsers()
        this.getAllRest()
        this.getAllCateg()
    }

    getUsers = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-rest': localStorage.getItem('auth-rest')
            },
        };
        fetch('http://localhost:5000/users/getrequsers', requestOptions)
            .then(response => response.json())
            .then(users => this.setState({ reqUsers: users }))
    }

    makeOwnder = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('http://localhost:5000/users/owner', requestOptions)
            .then(response => response.json())
            .then(data => this.getUsers())
    }

    removeRequest = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('http://localhost:5000/users/removerequsers', requestOptions)
            .then(response => response.json())
            .then(data => this.getUsers())
    }

    getAllRest = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-rest': localStorage.getItem('auth-rest')
            },
        };
        fetch('http://localhost:5000/restaurant/getAllrest', requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(length)
                this.setState({ restCount: data.count })
            })
    }

    getAllUsers = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-rest': localStorage.getItem('auth-rest')
            },
        };
        fetch('http://localhost:5000/users/alluser', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ userCount: data.count })
            } )
    }

    getAllCateg = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-rest': localStorage.getItem('auth-rest')
            },
        };
        fetch('http://localhost:5000/categories/getCategories', requestOptions)
            .then(response => response.json())
                .then(data => {
                    console.log('cat',data)
                    this.setState({ catCount: data.categories.length })
            })
    }



    render() {
        const { reqUsers,userCount,restCount,catCount } = this.state
        const { name , email} = this.props
        return (
            <div className='admin'>
                <AdminProfile email={email} name={name} />
                <div className='admin__users'>
                    <AdminStatus userCount={userCount} restCount={restCount} catCount={catCount}/>
                    {
                        reqUsers.map((user, i) => (
                            <div className='admin__user' key={i} >
                                <h3> {user.name} </h3>
                                <Button onClick={() => this.makeOwnder({ userId: user._id })}> Accept user's request </Button>
                                <Button onClick={() => this.removeRequest({ userId: user._id })} > Remove request </Button>
                            </div>

                        ))
                    }
                </div>
            </div>
        )
    }
}



export default AdminPanel