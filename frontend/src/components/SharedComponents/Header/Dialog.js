import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogHeader({ userId }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose1 = () => {
        setOpen(false);
    };

    const handleClose2 = () => {
        setOpen(false);
        postReq({ userId })
    };

    const postReq = (obj) => {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('users/request', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
    }



    return (
        <div>
            <Button id='logbtn' variant="contained" onClick={handleClickOpen}>
                Join Our Team
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose1}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Do you want to add your restaurant to our site ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        * monthly/yearly fees ...
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose1} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose2} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
