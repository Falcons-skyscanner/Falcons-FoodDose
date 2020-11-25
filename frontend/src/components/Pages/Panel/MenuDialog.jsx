import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MenuDialog({ setType, setPrice, addItem, type, price }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };





    return (
        <div>
            <Button variant="contained" id="logbtn" onClick={handleClickOpen}>
                Add item
      </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{" Add item to your menu "}</DialogTitle>
                <DialogContent>
                    <div style={{ display: 'flex' }}>
                        <TextField style={{margin:'5px'}} value={type} onChange={setType} id="outlined-basic" label="Item" variant="outlined" />
                        <TextField style={{margin:'5px'}} value={price} onChange={setPrice} id="outlined-basic" label="Price" variant="outlined" />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addItem} variant="contained" id="logbtn"> Add </Button>
                    <Button onClick={handleClose} variant="contained" id="logbtn">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
