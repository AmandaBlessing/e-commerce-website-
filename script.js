document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

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

    document.getElementById('checkout-button').addEventListener('click', () => {
        alert('Proceeding to checkout');
    });

    function updateCart() {
        cartItems.innerHTML = '';
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
                    <p>Price: $${item.price.toFixed(2)}</p>
                </div>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        cartCount.textContent = cart.length;
    }
});
