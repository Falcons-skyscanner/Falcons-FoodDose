import { Button } from '@material-ui/core'
import React from 'react'



class AdminPanel extends React.Component {
    constructor() {
        super()
        this.state = {
            reqUsers: []
        }
    }

    componentDidMount = () => {
        this.getUsers()
    }

    getUsers = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-rest': localStorage.getItem('auth-rest')
            },
        };
        fetch('users/getrequsers', requestOptions)
            .then(response => response.json())
            .then(users => this.setState({ reqUsers: users }))
    }

    makeOwnder = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('users/owner', requestOptions)
            .then(response => response.json())
            .then(data => this.getUsers())
    }

    removeRequest = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('users/removerequsers', requestOptions)
            .then(response => response.json())
            .then(data => this.getUsers())
    }



render() {
    const { reqUsers } = this.state
    return (
        <div className='admin'>
            {
                reqUsers.map((user, i) => (
                    <div className='admin__user' key={i} >
                        <h3> {user.name} </h3>
                        <Button onClick={() => this.makeOwnder({userId: user._id})}> Accept user's request </Button>
                        <Button onClick={() => this.removeRequest({userId: user._id})} > Remove request </Button>
                    </div>

                ))
            }
        </div>
    )
}
}



export default AdminPanel