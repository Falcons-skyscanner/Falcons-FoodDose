import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import OwnerProfile from './OwnerProfile'
import OwnerForm from './OwnerForm'
import OwnerMenu from './OwnerMenu'
import './Panel.css'

class Panel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            resName: '',
            resImg: '',
            resPhone: '',
            resAddress: '',
            catId: '',
            restId: '',
            categories: [],
            ownerRest: []

        }
    }




    componentDidMount = () => {
        this.getCat()
        this.getOwnerRest({ ownerId: this.props.ownerId })
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
        // console.log(value)
    }

    getCat = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:5000/categories/getCategories', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ categories: data.categories }))
    }


    addRest = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('http://localhost:5000/restaurant/createRes', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.connectRest({ restId: data._id, ownerId: this.props.ownerId })
            })
    }

    connectRest = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('/users/rest', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    ownerRest: data.user.restaurant
                })
            })
    }

    getOwnerRest = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('http://localhost:5000/users/ownerrest', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ ownerRest: data.user.restaurant, restId: data.user.restaurant._id })
            })
    }


    handlerestSubmit = (e) => {
        e.preventDefault()
        this.addRest(this.state)
    }

    handleSelect = (e) => {
        console.log(e.target.value)
        this.setState({ catId: e.target.value })
    }



    render() {

        const { resName, resImg, resPhone, resAddress, catId, categories, ownerRest,restId } = this.state
        const { email, name} = this.props

        return (
            <div className='Panel'>
                <div className='Panel__profile'>
                    <OwnerProfile email={email} name={name} ownerRest={ownerRest} />
                </div>
                { ownerRest.length === 0 ?
                    <div className='Panel__form'>
                        <div className='Panel__select'>

                            <h3> Restaurants Categories </h3>
                            <Select className='width' value={catId} onChange={this.handleSelect} style={{ width: '30%' }}>
                                {
                                    categories.map((cat, i) => <MenuItem key={i} value={cat._id}>{cat.Name}</MenuItem>)
                                }
                            </Select>
                        </div>
                        <OwnerForm resName={resName} resImg={resImg} resPhone={resPhone} resAddress={resAddress} onChange={this.handleChange} onSubmit={this.handlerestSubmit} />
                    </div>
                    : <OwnerMenu restId={restId} />
                }




            </div>
        )
    }
}
export default Panel