// Product Logic
const productGrid = document.getElementById("products");
const badge = document.querySelector(".cart-badge");

// Global Cart Array
let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

function updateBadge() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

async function getProducts() {
  productGrid.innerHTML = "<h3>Loading...</h3>";
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  productGrid.innerHTML = products.map(p => `
    <div class="product-card">
     <a href="singleproduct.html?id=${p.id}"><img src="${p.image}"></a>
      <h3>${p.title.slice(0, 30)}...</h3>
      <p>$${p.price}</p>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    
    </div>
  `).join("");
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

updateBadge();
getProducts();