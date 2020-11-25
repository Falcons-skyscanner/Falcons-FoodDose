import React from 'react'


const OwnerProfile = ({ ownerRest,name,email }) => {
    

    return (
        <div className='Oprofile'>
            <img className='Oprofile__img' src='https://img.favpng.com/15/4/0/computer-icons-portable-network-graphics-avatar-icon-design-image-png-favpng-2yuryP2VsRRfdwGXfv9c4DfmA_t.jpg' alt='avatar' />
            <h3>{name}</h3>
            <h5> {email} </h5>
            {
                ownerRest !== '' ? <div className='Oprofile__restaurant'>
                    <img className='rest__img' src={ownerRest.Image} alt='restImage' />
                    <h4>{ownerRest.Name}</h4>
                    <h4>{ownerRest.Address}</h4>
                    <h4> {ownerRest.Phone} </h4>
                </div> : <div></div>
            }

        </div>
    )

}


export default OwnerProfile