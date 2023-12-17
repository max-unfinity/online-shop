// Fetch Products from the Server
function fetchProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => displayProducts(data))
        .catch(error => console.error('Error:', error));
}

// Handle Form Submission
function handleProductSubmit(event) {
    event.preventDefault();
    const productData = {
        id: document.getElementById('product-id').value, // Empty for new products
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: document.getElementById('product-price').value,
        imageUrl: document.getElementById('product-image-url').value,
        category: document.getElementById('product-category').value
    };

    const method = productData.id ? 'PUT' : 'POST';
    const endpoint = productData.id ? `/api/products/${productData.id}` : '/api/products';

    fetch(endpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    })
    .then(() => fetchProducts())
    .catch(error => console.error('Error:', error));
}

// Edit Product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-image-url').value = product.imageUrl;
        document.getElementById('product-category').value = product.category;
    }
}

// Delete Product
function deleteProduct(productId) {
    fetch(`/api/products/${productId}`, { method: 'DELETE' })
        .then(() => fetchProducts())
        .catch(error => console.error('Error:', error));
}

// Display Products
function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <p>${product.name} - $${product.price}</p>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;
        container.appendChild(productDiv);
    });
}

// Initial fetch of products
fetchProducts();
