document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartElement = document.getElementById('cart');
    const cartTotal = document.getElementById('cart-total');
    
    let total = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <div class="item-info">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-name">${item.name}</div>
            </div>
            <div class="item-quantity-controls">
                <button class="btn btn-warning btn-sm" onclick="decreaseQuantity(${item.id})">-</button>
                <div class="item-quantity">${item.quantity}</div>
                <button class="btn btn-success btn-sm" onclick="increaseQuantity(${item.id})">+</button>
            </div>
            <div class="item-price">${(item.price * item.quantity).toFixed(2)}₺</div>
        `;
        cartElement.appendChild(listItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = total.toFixed(2) + '₺';

    const clearButton = document.getElementById('clear-button');
    if (cart.length > 0) {
        clearButton.style.display = 'inline-block';
    }

    clearButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        window.location.reload();
    });
    
    document.getElementById('checkout-button').addEventListener('click', () => {
        alert('Sipariş tamamlandı!');
        localStorage.removeItem('cart');
        window.location.reload();
    });
});

function increaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    }
}

function decreaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(p => p.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(p => p.id !== productId); // Ürün miktarı 1'e düşerse, ürünü sepetten çıkar
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    }
}
