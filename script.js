document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const productItems = document.querySelectorAll('.product-item');

    // Adding event listener to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);

            const item = cart.find(item => item.id === id);

            if (item) {
                item.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    // Adding event listener to "Checkout" button
    document.getElementById('checkout-button').addEventListener('click', () => {
        alert('Proceeding to checkout');
    });

    // Adding event listener to search button
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        searchProducts(query);
    });

    // Function to search products
    function searchProducts(query) {
        productItems.forEach(item => {
            const productName = item.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(query)) {
                item.style.display = 'block'; // Show matching products
            } else {
                item.style.display = 'none'; // Hide non-matching products
            }
        });
    }

    // Function to update cart display
    function updateCart() {
        cartItems.innerHTML = '';  // Clear current cart items
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="path/to/image${item.id}.jpg" alt="${item.name}">
                <div>
                    <p>${item.name}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: R${item.price.toFixed(2)}</p>
                    <button class="remove-from-cart" data-id="${item.id}">Remove</button>
                </div>
                <p>Total: R${(item.price * item.quantity).toFixed(2)}</p>
            `;
            
            cartItems.appendChild(cartItem);
        });

        // Add event listeners to "Remove" buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                removeFromCart(id);
            });
        });

        cartTotal.textContent = `Total: R${total.toFixed(2)}`;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Function to remove item from the cart
    function removeFromCart(id) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);  // Remove item from cart
            updateCart();
        }
    }
});
