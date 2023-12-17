// Function to load products from the server and display them
function loadPageContent(event, page, category = '') {
  event.preventDefault();  // Prevent default anchor action

  fetch(page)
      .then(response => response.text())
      .then(html => {
          document.getElementById('content').innerHTML = html;
          if (page === 'products.html') {
              loadProducts(category); // Pass the category to loadProducts
          }
      })
      .catch(error => console.error('Error loading page:', error));
}


function loadProducts(category) {
  let url = 'http://localhost:3000/api/products';
  if (category) {
      url += `?category=${encodeURIComponent(category)}`;
  }

  fetch(url)
      .then(response => response.json())
      .then(products => displayProducts(products))
      .catch(error => console.error('Error fetching products:', error));
}


// Function to display products on the page
function displayProducts(products) {
  const productsContainer = document.getElementById("product-grid");
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image_url}" alt="${product.name}" />
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
      `;
    productElement.innerHTML += `<button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>`;
    productsContainer.appendChild(productElement);
  });
}

// Load initial content (e.g., a home page or default view)
document.addEventListener("DOMContentLoaded", () => {
  loadPageContent("init_page.html");
});


// Cart functional

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
}

function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  cart.forEach((item, index) => {
      cartItemsContainer.innerHTML += `
          <div class="cart-item">
              <div class="item-info">
                  <span>${item.name} - $${item.price}</span>
              </div>
              <div class="item-action">
                  <button onclick="removeFromCart(${index})">Remove</button>
              </div>
          </div>`;
  });
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
}

function clearCart() {
  localStorage.removeItem('cart');
  displayCartItems();
}

document.addEventListener('DOMContentLoaded', displayCartItems);
