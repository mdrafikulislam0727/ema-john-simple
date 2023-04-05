import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const saveCart =useLoaderData();

    const [cart,setCart] =useState(saveCart);
    // console.log(saveCart)
    const handelRemoveFromCart = (id)=>{
        const remaining =cart.filter(product => product.id !==id);
        setCart(remaining)
        removeFromDb(id)
    }

    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product =><ReviewItem
                    key={product.id}
                    product={product}
                    handelRemoveFromCart={handelRemoveFromCart}
                    ></ReviewItem>)
                }
            </div>
            <dvi className='cart-container'>
                <Cart cart={cart}></Cart>
            </dvi>
        </div>
    );
};

export default Orders;