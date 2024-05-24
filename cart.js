document.addEventListener("DOMContentLoaded", () => {
    const products = [];
    const cartItemsEl = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");

    class Product {
        constructor(name, price, image) {
            this.name = name;
            this.price = parseFloat(price);
            this.image = image;
            this.id = Date.now();
        }

        addToDOM(container) {
            const productDiv = document.createElement("div");
            productDiv.className = "p-4 bg-white rounded shadow-lg flex flex-col items-center justify-center space-y-2";
            productDiv.innerHTML = `
                <h3 class="text-lg font-bold">${this.name}</h3>
                <p class="text-gray-700">$${this.price.toFixed(2)}</p>
                <img src="${this.image}" class="w-24 h-24 object-contain" />
                <input type="number" value="1" min="1" id="qty-${this.id}" class="mb-2 w-16 text-center border rounded">
                <div class="flex space-x-2">
                    <button class="add-single px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 cursor-pointer">Add 1 to Cart</button>
                    <button class="add-multiple px-4 py-2 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 cursor-pointer">Add Multiple to Cart</button>
                </div>
            `;
            productDiv.querySelector(".add-single").addEventListener("click", () => cart.addToCart(this.id, false));
            productDiv.querySelector(".add-multiple").addEventListener("click", () => cart.addToCart(this.id, true));
            container.appendChild(productDiv);
        }
    }

    class Cart {
        constructor() {
            this.items = [];
        }

        addToCart(productId, isMultiple) {
            const quantityInput = document.getElementById(`qty-${productId}`);
            const quantity = isMultiple ? parseInt(quantityInput.value) : 1;
            const product = products.find((p) => p.id === productId);
            const cartItem = this.items.find((item) => item.id === product.id);
            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                this.items.push({ ...product, quantity: quantity });
            }
            this.updateCart();
        }

        updateCart() {
            cartItemsEl.innerHTML = '';
            this.items.forEach((item) => {
                const cartItemElement = document.createElement('div');
                cartItemElement.innerHTML = `
                    <div class="flex items-center space-x-4">
                        <img src="${item.image}" alt="${item.name}" width="50">
                        <span>${item.name}</span>
                        <span>$${item.price.toFixed(2)}</span>
                        <span>Quantity: ${item.quantity}</span>
                        <button class="remove-item px-2 py-1 bg-red-500 text-white rounded">Remove</button>
                    </div>
                `;
                cartItemElement.querySelector('.remove-item').addEventListener('click', () => {
                    this.removeFromCart(item.id);
                });
                cartItemsEl.appendChild(cartItemElement);
            });

            const total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
        }

        removeFromCart(productId) {
            this.items = this.items.filter(item => item.id !== productId);
            this.updateCart();
        }

        clearCart() {
            this.items.length = 0;
            this.updateCart();
        }

        checkout() {
            const total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            alert(`Total amount to pay: $${total.toFixed(2)}`);
            this.clearCart();
        }
    }

    const cart = new Cart();

    document.getElementById('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('productName').value;
        const price = document.getElementById('productPrice').value;
        const image = document.getElementById('productImage').value;

        const product = new Product(name, price, image);
        products.push(product);
        product.addToDOM(document.getElementById('products'));
    });

    document.getElementById('clear-cart').addEventListener('click', () => cart.clearCart());
    document.getElementById('checkout').addEventListener('click', () => cart.checkout());
});
