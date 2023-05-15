import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () =>{
    // if cart data is in database, you have  to use async await
const storedCart =getShoppingCart();
console.log(storedCart)
const ids =Object.keys(storedCart);

const loadedProducts =await fetch(`http://localhost:5000/productsByIds`, {
    method:'POST',
    headers:{
        'content-type' : 'application/json'
    },
    body:JSON.stringify(ids)
});
const product = await loadedProducts.json();
console.log('product by ID',product)



const savedCart =[];
for(const id in storedCart){
    const addedProduct =product.find(pd => pd._id === id);
    if(addedProduct){
        const quantity =storedCart[id];
        addedProduct.quantity =quantity;
        savedCart.push(addedProduct)
    }
}
// if you need to send tow things
// return {product,savedCart}
// return [product,savedCart]

return savedCart;

}
export default cartProductsLoader;