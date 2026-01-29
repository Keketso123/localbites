const restaurantListEl = document.getElementById('restaurant-list');
const restaurantDetailsEl = document.getElementById('restaurant-details');

let restaurants = [];


fetch('data/restaurants.json')
  .then(res => res.json())
  .then(data => {
    restaurants = data;
    renderRestaurants();
  });


function renderRestaurants() {
  restaurantListEl.innerHTML = '';
  restaurants.forEach(r => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h2>${r.name}</h2>
      <p>${r.description}</p>
      <button onclick="viewRestaurant(${r.id})">View Menu</button>
    `;
    restaurantListEl.appendChild(div);
  });
}


function viewRestaurant(id) {
  const restaurant = restaurants.find(r => r.id === id);
  if (!restaurant) return;

  restaurantListEl.classList.add('hidden');
  restaurantDetailsEl.classList.remove('hidden');

  restaurantDetailsEl.innerHTML = `
    <div class="card">
      <h2>${restaurant.name}</h2>
      <p>${restaurant.description}</p>

      <h3>Menu</h3>
      ${restaurant.menu.map(item => `
        <div class="menu-item">
          <span>${item.name}</span>
          <span>R${item.price}</span>
        </div>
      `).join('')}

      <br />
      <button onclick="placeOrder()">Place Order</button>
      <button onclick="goBack()">Back</button>
    </div>
  `;
}


function placeOrder() {
  alert('✅ Order placed successfully! Thank you for supporting local businesses.');
}


function goBack() {
  restaurantDetailsEl.classList.add('hidden');
  restaurantListEl.classList.remove('hidden');
}
