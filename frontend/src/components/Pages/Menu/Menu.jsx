import React from 'react'

const Menu = ({ restaurant }) => {
    console.log(restaurant)
    return (
            <div className='category'>
                <img className='category__image' src='' alt='category' />
                <h4 className='category__title'> item from menu </h4>
            </div>
    )
}

export default Menu