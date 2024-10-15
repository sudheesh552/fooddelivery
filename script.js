const menuItems = {
    pizzeria: [
        { name: "Margherita Pizza", price: 300 },
        { name: "Pepperoni Pizza", price: 350 },
        { name: "Veggie Pizza", price: 280 }
    ],
    "burger-joint": [
        { name: "Cheeseburger", price: 250 },
        { name: "Double Burger", price: 350 },
        { name: "Veggie Burger", price: 200 }
    ],
    italian: [
        { name: "Pasta Alfredo", price: 320 },
        { name: "Lasagna", price: 400 },
        { name: "Tiramisu", price: 220 }
    ]
};

const urlParams = new URLSearchParams(window.location.search);
const restaurant = urlParams.get('restaurant');
const restaurantName = document.getElementById('restaurant-name');
const menuItemsDiv = document.getElementById('menu-items');
const totalSection = document.getElementById('total-section');
const totalAmountSpan = document.getElementById('total-amount');
const confirmOrderButton = document.getElementById('confirm-order');

let totalAmount = 0;

if (restaurant && menuItems[restaurant]) {
    restaurantName.textContent = restaurant.charAt(0).toUpperCase() + restaurant.slice(1).replace('-', ' ');
    menuItems[restaurant].forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';
        itemDiv.innerHTML = `
            <h3>${item.name} - ₹${item.price}</h3>
            <input type="number" min="0" value="0" class="item-quantity" data-price="${item.price}">
        `;
        menuItemsDiv.appendChild(itemDiv);
    });
}

menuItemsDiv.addEventListener('input', (event) => {
    if (event.target.classList.contains('item-quantity')) {
        calculateTotal();
    }
});

function calculateTotal() {
    totalAmount = 0;
    const quantities = document.querySelectorAll('.item-quantity');

    quantities.forEach(input => {
        const quantity = parseInt(input.value) || 0;
        const price = parseInt(input.dataset.price);
        totalAmount += quantity * price;
    });

    totalAmountSpan.textContent = totalAmount;
    totalSection.style.display = totalAmount > 0 ? 'block' : 'none';
}

confirmOrderButton.addEventListener('click', () => {
    alert(`Order confirmed! Total amount: ₹${totalAmount}`);
    // Additional functionality for order processing can be added here
});
