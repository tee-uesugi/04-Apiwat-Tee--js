document.addEventListener("DOMContentLoaded", () => {

    class Product {
        constructor(name, price, image) {
            this.name = name;
            this.price = price;
            this.image = image;
            this.id = Date.now();
        }
        
        addToDOM(container) {
            const productDiv = document.createElement("div");
            productDiv.className =
            "p-4 bg-white rounded shadow-lg flex flex-col items-center justify-center space-y-2";
            productDiv.innerHTML = `
                <h3 class="text-lg font-bold">${this.name}</h3>
                <p class="text-gray-700">$${this.price}</p>
                <img src="${this.image}" class="w-24 h-24 object-contain" />
                <input type="number" value="1" min="1" id="qty-${this.id}" class="mb-2 w-16 text-center border rounded">
                <div class="flex space-x-2">
                    <button class="add-single px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 cursor-pointer">Add 1 to Cart</button>
                    <button class="add-multiple px-4 py-2 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 cursor-pointer">Add Multiple to Cart</button>
                </div>
                `;
            productDiv
            .querySelector(".add-single")
            .addEventListener("click", () => cart.addToCart(this.id, false));
            productDiv
            .querySelector(".add-multiple")
            .addEventListener("click", () => cart.addToCart(this.id, true));
            container.appendChild(productDiv);
      }
    }
        
        // Simulated cart object
        const cart = {
            items: [],
            addToCart(id, isMultiple) {
                const qtyInput = document.getElementById(`qty-${id}`);
                const quantity = isMultiple ? parseInt(qtyInput.value, 10) : 1;
                this.items.push({ id, quantity });
                console.log(`Added product with id ${id}, quantity: ${quantity}`);
            }
        };





    // Event listener for the form submission to add a product
    document.getElementById('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('productName').value;
        const price = document.getElementById('productPrice').value;
        const image = document.getElementById('productImage').value;

        const product = new Product(name, price, image);
        product.addToDOM(document.getElementById('products'));
    });
});