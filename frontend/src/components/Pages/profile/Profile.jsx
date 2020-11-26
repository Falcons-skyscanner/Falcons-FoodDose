import React from 'react'
import OwnerProfile from '../Panel/OwnerProfile'
import DropOrder from './DropOrder';

const Profile = ({ userId, name, email }) => {

    const [orders, setOrders] = React.useState([]);
    React.useEffect(() => {
        // console.log(getMenu);
        getOrders({ userId })
    }, [userId]);

    const getOrders = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('http://localhost:5000/orders/getOrders', requestOptions)
            .then(response => response.json())
            .then(data =>{
                console.log(data)
                setOrders(data)
            } )
    }

    return (

        <div className='Panel'>
            <div className='Panel__profile'>
                <OwnerProfile email={email} name={name} ownerRest="" />
            </div>
            <div style={{display:'flex',flexDirection:'column',flex:'.6'}}  >
                {
                    orders.length ? orders.map( (order, i) => <DropOrder order={order} key={i} />) : 
                    <div style={{display:'flex', justifyContent:'center'}} >
                        <h2>No orders</h2>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile