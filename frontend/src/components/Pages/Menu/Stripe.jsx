import React from 'react'
import StripeCheckout from 'react-stripe-checkout'


const StripeButton = ({ price, name, userId,restId,food }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_bu7KkEYpaJwJcvi5N8IF0wAh00mLJ4D79e'

    const onToken = token => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token,
                amount: priceForStripe,
                cardUser: userId
            })
        }
        fetch('http://localhost:5000/credit/payment', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    alert('Failed and not zebet')
                } else {
                    console.log(data)
                    addOrder({
                        userId,
                        food,
                        restId
                    })
                    alert('succesful payment')
                    
                }
            })
    }

    const addOrder = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('http://localhost:5000/orders/Addorder', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
    }

  
    return (
        <StripeCheckout
            label='Buy'
            name={name}
            billingAddress
            shippingAddress
            image='https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Buy'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}


export default StripeButton;