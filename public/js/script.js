// Function to load products from the server and display them
function loadProducts() {
    fetch("http://localhost:3000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((products) => {
        console.log("Products:", products); // Log the response
        displayProducts(products);
      })
      .catch((error) => console.error("Error fetching products:", error));
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
        <button>Add to Cart</button>
      `;
    productsContainer.appendChild(productElement);
  });
}

function loadPageContent(page) {
  fetch(page)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
      // If the page is 'products.html', load its specific JavaScript
      if (page === "products.html") {
        loadProducts(); // This function should exist for loading products
      }
    })
    .catch((error) => console.error("Error loading page:", error));
}

// Load initial content (e.g., a home page or default view)
document.addEventListener("DOMContentLoaded", () => {
  loadPageContent("init_page.html");
});
