import React from 'react';
import './header.css'
import DialogHeader from './Dialog'
import { Button, Avatar } from '@material-ui/core'
import { Link } from "react-router-dom";


const Header = ({ userId, login, setLogin, setAdmin, setUser, setOwner, adminId, ownerId }) => {

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
            <Link className='header__link' to='/' style={{ textDecoration: 'none' }}>
                <img className='header__logo' src='https://www.pinclipart.com/picdir/middle/422-4226248_cutlery-clipart-restaurant-logo-restaurant-app-logo-png.png' alt='logo' />
                <h1>FoodDose</h1>
            </Link>
            <div className='header__titles'>
            
                {
                    adminId && login ?
                        <Link to='/admin' style={{ textDecoration: 'none' }}>
                            <Button id='logbtn' variant="outlined" > Go to admin Panel </Button>
                        </Link>
                        :
                        login && userId ?
                            <div className='dialog'>
                                <DialogHeader userId={userId} />
                            </div>
                            :
                            <div></div>
                }
                {
                    login ?
                        <div style={{ display: "flex" }}>
                            <div className='logbtn'>
                                <Button id='logbtn' variant="contained" onClick={LogOut} > LogOut </Button>
                            </div>
                            <Link to={adminId? '/admin': ownerId? '/panel':'/profile'}  className='avatar'>
                                <Avatar className='header__avatar' alt={userId} src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" />
                            </Link>
                        </div>
                        :
                        <Link className='logbtn' to='/login' style={{ textDecoration: 'none' }}>
                            <Button id='logbtn' variant="contained" > Login </Button>
                        </Link>
                }
            </div>
        </div>
    )

}


export default Header;