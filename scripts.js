// Global products dizisi
const products = [
    { id: 1, name: 'Ürün 1', price: 50, image: 'images/computer.jpg' }, 
    { id: 2, name: 'Ürün 2', price: 75, image: 'images/asuslaptop.jpg' },
    { id: 3, name: 'Ürün 3', price: 100, image: 'images/ps5.jpg' },
    { id: 4, name: 'Ürün 4', price: 200, image: 'images/phone.avif' }
];

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // Ürünleri listele
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4';
        productCard.innerHTML = `
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}₺</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Sepete Ekle</button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });

    // Sepeti güncelle
    updateCartSummary();
});

// Sepete ürün ekleme fonksiyonu
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Sepeti al veya boş bir dizi
    const product = products.find(p => p.id === productId); // Ürünü bul
    const existingItem = cart.find(item => item.id === productId); // Sepette var mı kontrol et

    if (existingItem) {
        existingItem.quantity += 1; // Varsa miktarını artır
    } else {
        cart.push({ ...product, quantity: 1 }); // Yoksa sepete yeni ürün ekle
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Sepeti localStorage'a kaydet
    updateCartSummary(); // Sepet özetini güncelle
}

// Sepet özetini güncelleme fonksiyonu (Ürün sayısı ve toplam fiyat)
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    cartCount.textContent = totalItems; // Sepetteki toplam ürün sayısı
    cartTotal.textContent = totalPrice.toFixed(2) + '₺'; // Sepetteki toplam fiyat
}
