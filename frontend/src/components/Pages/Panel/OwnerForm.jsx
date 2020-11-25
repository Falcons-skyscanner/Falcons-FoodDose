import React from 'react'
import { Input, Button } from '@material-ui/core'


const OwnerForm = ({resName, resImg, resPhone,resAddress, onChange, onSubmit}) => (
    <form className='Panel__resturant' onSubmit={onSubmit}>
        <h3> Add A resturant </h3>
        <Input
            className='width'
            type='text'
            value={resName}
            name='resName'
            placeholder="Restaurant Name"
            onChange={onChange} />
        <Input
            className='width'
            type='text'
            value={resImg}
            name='resImg'
            placeholder="Restaurant Image"
            onChange={onChange} />
        <Input
            className='width'
            type='text'
            value={resPhone}
            name='resPhone'
            placeholder="Restaurant Number"
            onChange={onChange} />
        <Input
            className='width'
            type='text'
            value={resAddress}
            name='resAddress'
            placeholder="Restaurant Adress"
            onChange={onChange} />
        <Button className='form__button' type='submit' variant="contained" color="secondary" > Add Res </Button>
    </form>
)

export default OwnerForm