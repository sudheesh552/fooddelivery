document.addEventListener("DOMContentLoaded", () => {
    const restaurants = [
        {
            name: "Italian Bistro",
            items: [
                { name: "Pasta", price: 12 },
                { name: "Pizza", price: 15 },
                { name: "Salad", price: 8 }
            ]
        },
        {
            name: "Sushi Place",
            items: [
                { name: "Sushi", price: 10 },
                { name: "Sashimi", price: 12 },
                { name: "Miso Soup", price: 5 }
            ]
        },
        {
            name: "Burger Joint",
            items: [
                { name: "Burger", price: 11 },
                { name: "Fries", price: 4 },
                { name: "Shake", price: 5 }
            ]
        },
    ];

    const restaurantList = document.getElementById("restaurants");
    const menu = document.getElementById("menu");
    const restaurantName = document.getElementById("restaurant-name");
    const itemsList = document.getElementById("items");
    const selectedItemsDiv = document.getElementById("selected-items");
    const selectedList = document.getElementById("selected-list");
    const orderConfirmation = document.getElementById("order-confirmation");
    const orderSummary = document.getElementById("order-summary");
    const totalAmount = document.createElement("p");

    let selectedItems = [];

    // Load restaurants
    restaurants.forEach((restaurant, index) => {
        const li = document.createElement("li");
        li.textContent = restaurant.name;
        li.addEventListener("click", () => showMenu(index));
        restaurantList.appendChild(li);
    });

    function showMenu(index) {
        const restaurant = restaurants[index];
        restaurantName.textContent = restaurant.name;
        itemsList.innerHTML = "";
        selectedItems = []; // Clear previous selections
        totalAmount.innerHTML = ""; // Clear total amount

        restaurant.items.forEach(item => {
            const li = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = item.name;
            checkbox.addEventListener("change", (e) => toggleSelection(item, checkbox.checked));
            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(`${item.name} - $${item.price}`));
            itemsList.appendChild(li);
        });
        menu.classList.remove("hidden");
    }

    function toggleSelection(item, isSelected) {
        if (isSelected) {
            selectedItems.push(item);
        } else {
            selectedItems = selectedItems.filter(i => i.name !== item.name);
        }
        updateTotal();
    }

    function updateTotal() {
        const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
        totalAmount.innerHTML = `Total: $${total.toFixed(2)}`;
        itemsList.appendChild(totalAmount);
    }

    document.getElementById("order-btn").addEventListener("click", () => {
        if (selectedItems.length > 0) {
            selectedItemsDiv.classList.remove("hidden");
            selectedList.innerHTML = selectedItems.map(item => `<li>${item.name} - $${item.price}</li>`).join('');
        }
    });

    document.getElementById("confirm-order-btn").addEventListener("click", () => {
        const itemNames = selectedItems.map(item => item.name).join(", ");
        const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
        orderSummary.textContent = `You have ordered: ${itemNames}. Total: $${total.toFixed(2)}`;
        orderConfirmation.classList.remove("hidden");
        selectedItemsDiv.classList.add("hidden");
    });

    document.getElementById("show-selected-btn").addEventListener("click", () => {
        selectedItemsDiv.classList.remove("hidden");
        selectedList.innerHTML = selectedItems.map(item => `<li>${item.name} - $${item.price}</li>`).join('');
    });
});
