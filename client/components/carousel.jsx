import React from 'react';
import './styles.css';
import Typography from '@material-ui/core/Typography'

export default function Carousel(props) {
    return (
        <div className = 'carousel'>
            <div className = 'carousel_Item' onClick = {(e) => props.handleProductClick(e, props.axe.productId, props.axe.tag)}>
                <img className= 'carousel_Pics'src={props.axe.images[0]}></img>
                    
                <div className = 'carousel_text'>
                    <Typography variant='body2'>
                        {props.axe.name}

                    </Typography>
                </div>
            </div>
        </div>
    )
}