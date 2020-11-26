import React from 'react'
import MenuItem from './MenuItem';
import Restaurant from '../Restaurants/Restaurant'

import { Button } from '@material-ui/core'
import OpenSelect from '../../SharedComponents/OpenSelect'

import StripeButton from './Stripe'

import './Menu.css'

const Menu = (props) => {
    // console.log(props)
    const [menu, setMenu] = React.useState([]);
    const [food, setFood] = React.useState([]);

    const restId = props.otherProps.match.params.id
    const userId = localStorage.getItem('userId') || localStorage.getItem('ownerId') || localStorage.getItem('adminId')
    React.useEffect(() => {
        // console.log(getMenu);
        getMenu({ restId })


        // console.log(menu);
        // return () => console.log('unmounting...')
    }, [restId, food]);




    const addItem = (item) => {
        // console.log("rest:", restaurantId, "item :", item._id, "user :", userId)
        let arr = [...food]
        const exist = arr.find(cartItem => cartItem._id === item._id)
        if (exist) {
            exist.count += 1

        } else {
            arr.push({ ...item, count: 1 })
        }
        setFood(arr)

    }

    const removeItem = (item) => {
        // console.log("rest:", restaurantId, "item :", item._id, "user :", userId)
        let arr = [...food]
        const exist = arr.find(cartItem => cartItem._id === item._id)
        if (exist.count === 1) {
            console.log(exist)
            arr.splice(arr.indexOf(exist), 1)

        }else{
            arr[arr.indexOf(exist)].count -= 1
        }
        
        // arr = arr.map( (cartItem) => (
        //     cartItem._id === item._id ? 
        //     { ...cartItem, count: cartItem.count - 1 } : cartItem
        // ) )
        setFood(arr)

    }






    const price = (array) => {

        return array.reduce((acc, item) => acc + (item.price * item.count), 0)



    }

    const getMenu = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('http://localhost:5000/menu/getItems', requestOptions)
            .then(response => response.json())
            .then(data => { setMenu(data.items) })
    }


    // console.log(props.match.params.id, menu);

    const newPrice = price(food)
    console.log(newPrice)

    return (
        <div className="restaurantMenu">
            <div className='restaurantDetail__menu'>
                {
                    menu[0] ?
                        <Restaurant restaurant={menu[0].resturant} /> : <div></div>
                }
            </div>
            <div className='items__menu'>
                {
                    menu[0] ?
                        menu.map((item, i) => {
                            return <MenuItem addItem={addItem} restaurantId={menu[0].resturant._id} item={item} key={i} />
                        }) : <div></div>
                }
            </div>
            <div className='cart__menu'>
                <h2>Cart</h2>
                {
                    food.map((item, i) => {

                        return <div key={i} className='cart__item'>
                            <h4 className='cart__text'>{item.type}</h4>
                            <div className='cart__price'>
                                <p className='cart__text'>${item.price}</p>
                                <div style={{ margin: "10px" }}>
                                    <OpenSelect key={i} item={item} addItem={addItem} removeItem={removeItem} />
                                </div>
                            </div>

                        </div>
                    })
                }
                {
                    ((food.length > 0) && userId) ? <StripeButton name={props.name} food={food} restId={restId} userId={userId} price={newPrice} /> : <div>{userId ? 'Empty Card' : 'Login First to order please'}</div>
                }
            </div>
        </div>
    )
}

export default Menu