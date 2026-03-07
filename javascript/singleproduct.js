document.addEventListener ("DOMContentLoaded",()=>{
    const productContent = document.getElementById("product-content")
    const badge = document.querySelector(".cart-badge");

    const URLparams = new URLSearchParams(window.location.search)
    const productid = URLparams.get('id')

    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

 function updateBadge() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
  localStorage.setItem("cartItems", JSON.stringify(cart));
 }



    async function fetchProducts(id) {
        try{
            const res = await fetch(`https://fakestoreapi.com/products/${id}`)
            const product = await res.json()

            productContent.innerHTML = 
            `
            <div class="product-container">
            <div class="product-image-container"> 
            <img src="${product.image}">
            </div>
            <div class="product-info"> 
            <p> Category : ${product.category}</p>
            <p> Price : ${product.price}</p>
            <p> Description : ${product.description}</p>
            <button data-id="${product.id}"onclick="addToCart(${product.id})">  Add to cart </button>

            
            
            </div>
            </div>
            `
        }
        catch(error){
            
        }
    }
    window.addToCart = (id) => {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id: id, qty: 1 });
  }
  updateBadge();
};

    fetchProducts(productid)
}
)
   