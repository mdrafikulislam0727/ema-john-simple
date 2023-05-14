import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
const Shop = () => {
    const [products, setProducts] = useState([])

    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1 : get id of the addedProduct
        for (const id in storedCart) {
            // step 2 : get product form products state by using id
            const addedProduct = products.find(product => product._id === id)
            if (addedProduct) {
                // step 3 : add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // stop 4 : add the added product to the product cart
                savedCart.push(addedProduct)
            }
            // step 5 : set the cart
            setCart(savedCart)
        }
    }, [products])

    const handelAddToCart = (product) => {
        const nweCart = [...cart, product];
        setCart(nweCart)
        addToDb(product._id)
    }

    const handelClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handelAddToCart={handelAddToCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                    cart={cart}
                    handelClearCart={handelClearCart}
                >
                    <Link to="/orders">
                        <button className='btn-proceed'>Review Orders</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;