import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({ category }) => {
    return (
        <Link to={`/category/${category._id}`} className='category__Link'>
            <div className='category'>
                <img className='category__image' src={category.Image} alt='category' />
                <h4 className='category__title'> {category.Name}  </h4>
            </div>
        </Link>
    )
}

export default Category