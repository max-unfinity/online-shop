// Function to load products from the server and display them
function loadProducts() {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(products => displayProducts(products))
      .catch(error => console.error('Error fetching products:', error));
  }
  
  // Function to display products on the page
  function displayProducts(products) {
    const productsContainer = document.getElementById('product-grid');
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image_url}" alt="${product.name}" />
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button>Add to Cart</button>
      `;
      productsContainer.appendChild(productElement);
    });
  }
  
  // Load products when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', loadProducts);
  