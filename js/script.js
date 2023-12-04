document.addEventListener('DOMContentLoaded', function() {
    fetch('php/fetch_products.php')
        .then(response => response.json())
        .then(data => displayProducts(data));
});

function displayProducts(products) {
    const gallery = document.getElementById('product-gallery');
    products.forEach(product => {
        const tile = document.createElement('div');
        tile.className = 'product-tile';
        tile.innerHTML = `
            <img src="${product.item_photo}" alt="${product.item_name}">
            <h3>${product.item_name}</h3>
            <p>${product.item_description}</p>
            <p>Price: $${product.price}</p>
        `;
        gallery.appendChild(tile);
    });
}
