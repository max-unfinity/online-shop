// Function to load products from the server and display them
function loadPageContent(event, page, category = '') {
  event.preventDefault();

  if (page === 'products.html') {
      fetch(page)
          .then(response => response.text())
          .then(html => {
              document.getElementById('content').innerHTML = html;
              loadProducts(category); // Load products of the clicked category
          })
          .catch(error => console.error('Error loading page:', error));
  }
  // If not loading products, the "About" section remains displayed
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
// function displayProducts(products) {
//   const productsContainer = document.getElementById("product-grid");
//   products.forEach((product) => {
//     const productElement = document.createElement("div");
//     productElement.innerHTML = `
//         <h3>${product.name}</h3>
//         <img src="${product.image_url}" alt="${product.name}" />
//         <p>${product.description}</p>
//         <p>Price: $${product.price}</p>
//       `;
//     productElement.innerHTML += `<button onclick='addToCart(${JSON.stringify(product)})'>Добавить в корзину</button>`;
//     productsContainer.appendChild(productElement);
//   });
// }

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
                  <span>${item.name} - ${item.price} руб.</span>
              </div>
              <div class="item-action">
                  <button onclick="removeFromCart(${index})">Удалить</button>
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

function goToCheckout() {
  window.location.href = 'checkout.html';
}

function handleCheckout(event) {
  event.preventDefault();
  // Gather form data and perform the checkout process
  const fullname = document.getElementById('fullname').value;
  const address = document.getElementById('address').value;
  const paymentMethod = document.getElementById('payment-method').value;
  // Implement the checkout logic (e.g., sending data to the server)
  alert(`Спасибо за покупку! Мы обработаем Ваш заказ и позвоним, чтобы учтонить детали.`);
  // Clear the cart
  clearCart();
}

function displayCheckoutItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const checkoutItemsContainer = document.getElementById('checkout-items');
  let totalPrice = 0;

  checkoutItemsContainer.innerHTML = '';
  cart.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.textContent = `${item.name} - ${item.price} руб.`;
      checkoutItemsContainer.appendChild(itemElement);
      totalPrice += parseFloat(item.price);
  });

  // Display total price
  const totalPriceElement = document.createElement('div');
  totalPriceElement.className = 'total-price';
  totalPriceElement.textContent = `Итого: ${totalPrice} руб.`;
  checkoutItemsContainer.appendChild(totalPriceElement);
}


// Admin Functional

const adminCredentials = {
  username: 'admin',
  password: 'admin'  // In real application, use secure methods
};

function showAdminLogin() {
  const user = prompt('Enter username:');
  const pass = prompt('Enter password:');

  if (user === adminCredentials.username && pass === adminCredentials.password) {
      window.location.href = 'admin.html'; // Redirect to admin page
  } else {
      alert('Неверные логин или пароль.');
  }
}

function showAdminLoginForm() {
  document.getElementById('admin-login-form').style.display = 'block';
}

function handleAdminLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin') { // Hardcoded credentials
      window.location.href = 'admin.html'; // Redirect to admin page
  } else {
      alert('Неверные логин или пароль.');
  }
}

// Fetch Main Categories from the Server
function fetchMainCategories() {
  fetch('http://localhost:3000/api/categories')
      .then(response => response.json())
      .then(categories => {
          const categoryList = document.getElementById('category-list');
          categoryList.innerHTML = categories.map(cat => 
              `<li>
                  <a href="#" onclick="toggleSubcategories(event, ${cat.id})">${cat.name}</a>
                  <ul id="subcategories-${cat.id}" class="subcategories"></ul>
              </li>`
          ).join('');
      })
      .catch(error => console.error('Error:', error));
}

function toggleSubcategories(event, categoryId) {
  event.preventDefault();
  const allSubcategoryLists = document.querySelectorAll('.subcategories');
  allSubcategoryLists.forEach(list => {
      if (list.id !== `subcategories-${categoryId}`) {
          list.style.display = 'none'; // Hide other subcategories
      }
  });

  const subcategoriesList = document.getElementById(`subcategories-${categoryId}`);
  if(subcategoriesList.style.display === 'none' || subcategoriesList.innerHTML === '') {
      fetchSubcategories(categoryId, subcategoriesList);
      subcategoriesList.style.display = 'block';
  } else {
      subcategoriesList.style.display = 'none'; // Toggle visibility
  }
}

function fetchSubcategories(categoryId, subcategoriesList) {
  fetch(`http://localhost:3000/api/subcategories?category=${categoryId}`)
      .then(response => response.json())
      .then(subcategories => {
          subcategoriesList.innerHTML = subcategories.map(sub => 
              `<li><a href="#" onclick="fetchProductsBySubcategory(${sub.id})">${sub.name}</a></li>`
          ).join('');
      })
      .catch(error => console.error('Error:', error));
}

// Fetch and Display Products Based on Subcategory
function fetchProductsBySubcategory(subcategoryId) {
  fetch(`http://localhost:3000/api/products?subcategory=${subcategoryId}`)
      .then(response => response.json())
      .then(products => {
          displayProducts(products);
      })
      .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
  const contentArea = document.getElementById("content");
  contentArea.innerHTML = '<div id="product-grid"></div>'; // Reset and prepare the product grid
  const productsContainer = document.getElementById("product-grid");

  products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.innerHTML = `
          <h3>${product.name}</h3>
          <img src="/images/${product.image_url}" alt="${product.name}" />
          <p>${product.description}</p>
          <p>Цена: ${product.price} руб.</p>
          <button onclick='addToCart(${JSON.stringify(product)})'>Добавить в корзину</button>
      `;
      productsContainer.appendChild(productElement);
  });
}

// Initial fetch of main categories
// document.addEventListener("DOMContentLoaded", fetchMainCategories);
// document.addEventListener('DOMContentLoaded', displayCartItems); // For cart items

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.href.includes('checkout.html')) {
    displayCheckoutItems();
  } else {
    fetchMainCategories();
    displayCartItems();
  }
});
