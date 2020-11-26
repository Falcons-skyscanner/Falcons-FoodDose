import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export default function ItemCard({restaurantId, item, addItem}) {

    return (
        <Card className="menuItem">
                {/* <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                /> */}
                <CardContent className="item__detail">
                    <Typography gutterBottom variant="h6" component="h4">
                        {item.type}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        ${item.price}
                    </Typography>
                </CardContent>
            <CardActions className="item__detail">
                <Button size="small" color="primary" onClick={()=>{addItem(item)}}>
                    Add to cart
                </Button>
            </CardActions>
        </Card> 
    );
}
