const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');
const checkoutButton = document.getElementById('checkout-btn');
const closeCartButton = document.getElementById('close-cart-btn');

let cart = [];

function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsList.appendChild(listItem);
        total += item.price * item.quantity;
    });
    cartTotalElement.textContent = total.toFixed(2);
    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price);
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartDisplay();
        cartModal.style.display = 'block'; // Show cart after adding
    });
});

// Initially hide the cart modal
cartModal.style.display = 'none';

// Open cart functionality (you might want a separate button for this in the header)
const cartLink = document.querySelector('nav a:nth-child(3)'); // Assuming "Cart" is the 3rd link
cartLink.addEventListener('click', function(event) {
    event.preventDefault();
    cartModal.style.display = 'block';
});

closeCartButton.addEventListener('click', function() {
    cartModal.style.display = 'none';
});

checkoutButton.addEventListener('click', function() {
    if (cart.length > 0) {
        alert('Checkout functionality not implemented yet. Your total is $' + cartTotalElement.textContent);
        // In a real application, you would redirect to a checkout page
        cart = []; // Clear cart after "checkout" for this example
        updateCartDisplay();
        cartModal.style.display = 'none';
    } else {
        alert('Your cart is empty.');
    }
});

// Update cart display on initial load (if there's any data in local storage, for example)
updateCartDisplay();