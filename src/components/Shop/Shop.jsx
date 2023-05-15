import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
const Shop = () => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] =useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [cart, setCart] = useState([])
    const { totalProducts } = useLoaderData();
    
    const totalPages =Math.ceil(totalProducts / itemsPerPage)

    // const pageNumbers = [];
    // for(let i= 1 ; i <= totalPages; i++){
    //     pageNumbers.push(i)
    // }

    const pageNumbers =[...Array(totalPages).keys()]
    /**
     * Done: 1. Determine the total number of items
     * TODO: 2. Decide on the number of items per page
     * Done: 3. Calculate the total number of pages:
     * 
     * 
     * **/ 

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])

    useEffect(()=>{
        async function fetchData (){
            const response = await fetch(`http://localhost:5000/products?page= ${currentPage}&limit=${itemsPerPage}`);
            const data =await response.json()
            setProducts(data);
        }
        fetchData()
    },[currentPage, itemsPerPage])

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
    const options = [5,10, 15,20]
    function handleSelectChange (event){
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0)
    }

    return (
        <>
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
        {/* pagination */}
        <div className="pagination">
            <p>current page: {currentPage} and  items per page : {itemsPerPage}</p>
            {
                pageNumbers.map(number =><button
                    onClick={()=> setCurrentPage(number)}
                    className={currentPage === number ? 'selected' : ''}
                     key={number}>
                    {number}</button>)
            }
            <select value={itemsPerPage} onChange={handleSelectChange}>
            {options.map(option =>(
                <option key={option} value={option}>{option}</option>
            ))}
            </select>
        </div>
        </>
    );
};

export default Shop;