const cartItemsTable = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total");
const badge = document.querySelector(".cart-badge");

let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

function updateUI() {
  localStorage.setItem("cartItems", JSON.stringify(cart));
  badge.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  renderCart();
}

async function renderCart() {
  if (cart.length === 0) {
    cartItemsTable.innerHTML = "<tr><td colspan='5'>Your cart is empty</td></tr>";
    totalPriceEl.textContent = "0.00";
    return;
  }

  const res = await fetch("https://fakestoreapi.com/products");
  const allProducts = await res.json();
  
  let total = 0;
  cartItemsTable.innerHTML = "";

  cart.forEach(item => {
    const p = allProducts.find(product => product.id === item.id);
    if (!p) return;

    const subtotal = p.price * item.qty;
    total += subtotal;

    cartItemsTable.innerHTML += `
      <tr>
        <td><img src="${p.image}" width="50"></td>
        <td>${p.title.slice(0, 20)}...</td>
        <td>$${p.price}</td>
        <td>
          <button onclick="changeQty(${p.id}, -1)">-</button>
          ${item.qty}
          <button onclick="changeQty(${p.id}, 1)">+</button>
        </td>
        <td>$${subtotal.toFixed(2)}</td>
       <td>
        <button class="turn" onclick="removeItem(${p.id})"> Delete </button> 
        </td>
      </tr>
    `;
  });

  totalPriceEl.textContent = total.toFixed(2);
}
window.removeItem = (id)=> {
  cart = cart.filter(item => item.id !== id )
  updateUI()
}  
window.changeQty = (id, change) => {
  const item = cart.find(p => p.id === id);
  item.qty += change;
  if (item.qty <= 0) removeItem(id);
  else updateUI();
};



updateUI();