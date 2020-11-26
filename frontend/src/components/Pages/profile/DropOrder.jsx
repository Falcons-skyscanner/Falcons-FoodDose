import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '25px 25px'

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


export default function DropOrder({ order }) {
    const classes = useStyles();

    const orderTotal = (arr) => {
        return arr.reduce((acc, item) => acc + (item.price * item.count), 0)
    }
    
    const price = orderTotal(order.food)

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Typography >{order.resturant.Name}</Typography>
                        <Typography >${price}</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        order.food.map((item, i) => <Typography key={i}> {item.type} ${item.price} x {item.count} </Typography>)
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
