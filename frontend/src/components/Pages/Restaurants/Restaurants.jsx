import React from 'react'
import Restaurant from './Restaurant';

class Restaurants extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurants: []
        }
    }

    componentDidMount() {
        console.log(this.props)
        const categoryId = this.props.match.params.id
        this.getRestaurants({ categoryId})
    }

    getRestaurants(obj) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('/restaurant/getRestaurants', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ restaurants: data })
            })
    }

    render() {
        console.log(this.props.match.params.id)
        const {restaurants} = this.state
        return (
            <div>
                <h1>Resturant</h1>
                {
                    restaurants? restaurants.map( (rest , i) => <Restaurant restaurant={rest} key={i} /> ):<div></div>
                }
            </div>
        )
    }


}


export default Restaurants