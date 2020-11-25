import React from 'react'
import MenuDialog from './MenuDialog'
import ItemCard from './ItemCard'

class OwnerMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: [],
            type: '',
            price: ''
        }
    }

    componentDidMount = () => {
        this.getMenu({ restId: this.props.restId })
    }

    setType = (event) => this.setState({ type: event.target.value })
    setPrice = (event) => this.setState({ price: event.target.value })

    getMenu = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('http://localhost:5000/menu/getItems', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ menu: data }))

    }

    postReq = (obj) => {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('http://localhost:5000/menu/additem', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.componentDidMount()
                this.setState({
                    type: '',
                    price: ''
                })
            })
    }

    addItem = () => {
        this.postReq({ restId: this.props.restId, type: this.state.type, price: this.state.price })
    }

    deleteItem=(id)=>{
        console.log(id)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        };
        fetch('menu/deleteItem', requestOptions)
            .then(response => response.json())
            .then(() => {
                this.componentDidMount()
            })
    }


    render() {
        const { restId } = this.props

        const { type, price, menu } = this.state
        console.log(menu)

        return (
            <div className='Panel__menu'>
                <div>
                    <MenuDialog setType={this.setType} setPrice={this.setPrice} addItem={this.addItem} type={type} price={price} />
                </div>
                <div className="menu">
                    {
                        menu.map((item, i) => {
                            return <div key={i} className="menuItem">
                                <ItemCard item={item} deleteItem={this.deleteItem}/>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}


export default OwnerMenu