import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () =>{
const loadedProducts =await fetch('products.json');
const product = await loadedProducts.json();

// if cart data is in database, you have  to use async await
const storedCart =getShoppingCart();
console.log(storedCart)
const savedCart =[];
for(const id in storedCart){
    const addedProduct =product.find(pd => pd.id === id);
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