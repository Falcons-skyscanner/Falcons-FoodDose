<<<<<<< HEAD
// import React from 'react';
// import './header.css'
// import { styled, makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import { AppBar, Toolbar, Typography } from '@material-ui/core';
// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         flexGrow: 1,
//     },
// }));
// const Login = styled(Button)({
//     background: '#F69624',
//     border: 0,
//     borderRadius: 30,
//     color: 'white',
//     height: 48,
//     padding: '20px 30px',
// });
// function Header() {

//     const classes = useStyles();



//     return (
//         <div className={classes.root}>
//             <AppBar position="static" class="appbar">
//                 <Toolbar>

//                     <Typography variant="h6" className={classes.title} id="fooddose" onClick={() => {
//                         window.location.href = '/'
//                     }} >
//                         FoodDose
//                             </Typography>

//                     <Login onClick={() => {
//                         window.location.href = '/login'
//                     }} id="login">LogIn</Login>

//                 </Toolbar>
//             </AppBar>
//         </div>
//     );

// }


// export default Header;

import React from 'react'
import BasicButtonGroup from './material'
import { Link } from 'react-router-dom'
// import MaxWidthDialog from './MaxWidthDialog'

import './header.css'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }




    render() {

        return (
            <div class="header">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <img className='Header__logo' src='https://previews.123rf.com/images/alisher/alisher1606/alisher160600004/58733281-food-service-logo-with-spoon-and-fork.jpg' alt='logo' />
                </Link>

                <div class="header-right">
                    <BasicButtonGroup/>
                </div>    
                
            </div>
        )
    }
}


export default Header
=======
import React from 'react';
import './header.css'
import DialogHeader from './Dialog'
import { Button } from '@material-ui/core';

const Header = ({ userId,login,setLogin,setAdmin,setUser,setOwner }) => {

    const LogOut = () => {
        localStorage.removeItem('auth-rest')
        localStorage.removeItem('userId')
        localStorage.removeItem('adminId')
        localStorage.removeItem('ownerId')
        setLogin(false)
        setAdmin('')
        setUser('')
        setOwner('')
    }

    return (
        <div className='header'>
            <img className='header__logo' src='https://i.pinimg.com/originals/6e/45/8c/6e458c5c2c3038766eab5a6321337de2.png' alt='logo' />

            <div className='header__titles'>
                <DialogHeader userId={userId} />
                {
                    login ? <Button onClick={LogOut} > LogOut </Button> : <div></div>
                }
            </div>

        </div>
    )

}


export default Header;
>>>>>>> f3fc8ccdecd4d08eba513b12d065e371c0192c0d
