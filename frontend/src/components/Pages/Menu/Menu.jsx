import React from 'react'

const Menu = (props) => {
    console.log(props.match.params.id)
    const [menu, setMenu] = React.useState([]);
    const restId = props.match.params.id
    React.useEffect(() => {
        console.log(getMenu);
        getMenu({restId})
    },[menu, restId]);

    const getMenu = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('menu/getItems', requestOptions)
            .then(response => response.json())
            .then(data => {setMenu(data); console.log('s')})
    }
    console.log(menu);
    return (
        <div className='category'>
            <img className='category__image' src='' alt='category' />
            <h4 className='category__title'> item from menu </h4>
        </div>
    )
}

export default Menu