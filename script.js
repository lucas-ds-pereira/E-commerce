document.addEventListener('DOMContentLoaded', () => {
    const banners = document.querySelectorAll('.banner');
    let currentBannerIndex = 0;

    function showNextBanner() {
        banners[currentBannerIndex].classList.remove('active');
        currentBannerIndex = (currentBannerIndex + 1) % banners.length;
        banners[currentBannerIndex].classList.add('active');
    }

    // Inicializar o primeiro banner como ativo
    banners[currentBannerIndex].classList.add('active');

    // Configurar o intervalo para trocar os banners
    setInterval(showNextBanner, 5000);
});

document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Função para formatar valores como moeda brasileira
    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Função para atualizar o contador do carrinho
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCountElement.textContent = cart.reduce((count, item) => count + item.quantity, 0);
    }

    // Função para adicionar item ao carrinho
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(item => item.name === product.name);

        if (productIndex !== -1) {
            cart[productIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    // Adicionan event listeners para os botões "Add to Cart"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const name = card.querySelector('h2').textContent;
            const price = parseFloat(card.querySelector('p').textContent.replace('R$', '').replace('.', '').replace(',', '.'));

            addToCart({ name, price });
        });
    });

    // Atualizar o contador do carrinho ao carregar a página
    updateCartCount();
});

document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    const orderItemsContainer = document.querySelector('.order-items');
    const orderTotalElement = document.getElementById('order-total');
    const checkoutForm = document.getElementById('checkout-form');

    // Função para formatar valores como moeda brasileira
    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Função para atualizar o contador do carrinho
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCountElement.textContent = cart.reduce((count, item) => count + item.quantity, 0);
    }

    // Função para exibir o resumo do pedido
    function displayOrderSummary() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        orderItemsContainer.innerHTML = '';

        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} x ${item.quantity} - ${formatCurrency(itemTotal)}`;
            orderItemsContainer.appendChild(itemElement);
        });

        orderTotalElement.textContent = formatCurrency(total);
    }

    // Função para confirmar o pedido e limpar o carrinho
    function confirmOrder(event) {
        event.preventDefault();
        localStorage.removeItem('cart');
        updateCartCount();
        displayOrderSummary();
        checkoutForm.reset();
        alert('Pedido confirmado!');
    }

    // Adicionar event listener para o botão "Confirmar"
    checkoutForm.addEventListener('submit', confirmOrder);

    // Atualizar o contador do carrinho e exibir o resumo do pedido ao carregar a página
    updateCartCount();
    displayOrderSummary();
});

