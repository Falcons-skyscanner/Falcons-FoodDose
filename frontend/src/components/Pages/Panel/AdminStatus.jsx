import React from 'react'
import { Avatar } from '@material-ui/core'

const AdminStatus = ({userCount,restCount,catCount}) => {

    return (
        <div className='status'>
            <div className='status__category'>
                <Avatar className='status__avatar' alt='C' />
                <h3> Categories : {catCount}  </h3>
            </div>
            <div className='status__rest'>
                <Avatar className='status__avatar' alt='R' />
                <h3> Resturants : {restCount}  </h3>
            </div>
            <div className='status__users'>
                <Avatar className='status__avatar' alt='U' />
                <h3> Users : {userCount}  </h3>
            </div>
        </div>
    )
}

export default AdminStatus