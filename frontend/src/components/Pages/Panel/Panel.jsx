import React from 'react'
import { Input, Button, MenuItem, Select } from '@material-ui/core'

import './Panel.css'

class Panel extends React.Component {
    constructor(){
        super()
        
        this.state = {
            resName: '',
            resImg: '',
            resPhone: '',
            resAddress: '',
            catId: '',
            restId: '',
            random: '',
            categories: [],
    
        }
    }
    

    

    componentDidMount = () => {
        this.getCat()
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
        fetch('/categories/getCategories', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ categories: data.categories }))
    }

    addCat = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('/categories/createCat', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ catId: data.id }));
    }

    addRest = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('/resturants/createRes', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    handleCatSubmit = (e) => {
        e.preventDefault()
        this.addCat(this.state)
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
        const { resName, resImg, resPhone, resAddress, catId, categories,newInput,random } = this.state
        return (
            <div className='Panel'>
                <Select value={catId} onChange={this.handleSelect} style={{width:'30%'}}>
                    {
                        categories.map((cat, i) => <MenuItem key={i} value={cat._id}>{cat.Name}</MenuItem>)
                    }
                </Select>
                {/* <form className='Panel__category' onSubmit={this.handleCatSubmit}>
                    <h1>Add a category</h1>
                    <Input
                        type='text'
                        value={catName}
                        name='catName'
                        onChange={this.handleChange} />
                    <Input
                        type='text'
                        value={catImg}
                        name='catImg'
                        onChange={this.handleChange} />
                    <Button type='submit' variant="outlined" color="primary" > Add Cat </Button>
                </form> */}
                <form className='Panel__resturant' onSubmit={this.handlerestSubmit}>
                    <h1> Add A resturant </h1>
                    <Input
                        type='text'
                        value={resName}
                        name='resName'
                        onChange={this.handleChange} />
                    <Input
                        type='text'
                        value={resImg}
                        name='resImg'
                        onChange={this.handleChange} />
                    <Input
                        type='text'
                        value={resPhone}
                        name='resPhone'
                        onChange={this.handleChange} />
                    <Input
                        type='text'
                        value={resAddress}
                        name='resAddress'
                        onChange={this.handleChange} />
                    <Button type='submit' variant="outlined" color="primary" > Add Res </Button>
                </form>
                {/* <h1> {catId} </h1> */}
            </div>
        )
    }
}
export default Panel