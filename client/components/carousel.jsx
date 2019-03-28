import React from 'react';

export default function Carousel(props) {
    return (
        <div className = 'carousel'>
            <div className = 'carousel_Item' onClick = {(e) => props.handleProductClick(e, props.axe.productId, props.axe.tag)}>
                <img className= 'carousel_Pics'src={props.axe.images[0]}></img>
                    
                <div>
                    {props.axe.name}
                </div>
            </div>
        </div>
    )
}