import React from 'react'
import { Link } from 'react-router-dom'
import './restaurant.css'

const Restaurant = ({ restaurant }) => {
    return (
        <Link to={`/restaurant/${restaurant._id}`} className='restaurant__Link'>
            <div className='restaurant'>
                <img className='restaurant__image' src={restaurant.Image} alt='restaurant' />
                <div className='restaurant__details'>
                <h1 className='restaurant__title'> {restaurant.Name}  </h1>
                <p >Address: {restaurant.Address} </p>
                <p>Phone: {restaurant.Phone} </p>
                </div>
            </div>
        </Link>
    )
}

export default Restaurant