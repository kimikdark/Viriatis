// script.js

// --- Lógica do Formulário de Contacto (para Contactos.html) ---

// Define o construtor do objeto Contato
function Contato(nome, email, assunto, mensagem) {
    this.nome = nome;
    this.email = email;
    this.assunto = assunto;
    this.mensagem = mensagem;
}

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('formulario-contacto');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Obtém os valores dos campos do formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;

            // Cria uma nova instância do objeto Contato
            const novoContato = new Contato(nome, email, assunto, mensagem);

            // Exibe mensagem de confirmação com os dados do objeto Contato
            alert(
                `Obrigado pelo seu contacto, ${novoContato.nome}!\n\n` +
                `Detalhes da Mensagem:\n` +
                `Email: ${novoContato.email}\n` +
                `Assunto: ${novoContato.assunto}\n` +
                `Mensagem: ${novoContato.mensagem}`
            );

            // Exibe a mensagem de sucesso na página
            document.getElementById('mensagem-sucesso').style.display = 'block';

            // Reinicia o formulário
            this.reset();
        });
    }

    // --- Lógica de Gestão de Produtos (para Produtos.html) ---
    const productListingsSection = document.getElementById('product-listings');
    const productFormSection = document.getElementById('product-form-section');

    if (productListingsSection && productFormSection) {
        let products = [
            { id: 1, name: "T-Shirt Clássica", description: "Confeccionada para refletir o teu espírito.", price: "15,00€", image: "Imagens/Roupas/2.jpg" },
            { id: 2, name: "Sweatshirt Identitária", description: "Confeccionada para refletir o teu espírito.", price: "25,00€", image: "Imagens/Roupas/1.jpg" },
            { id: 3, name: "T-Shirt Guerreiro", description: "Inspirada nos guerreiros de outrora.", price: "15,00€", image: "Imagens/Roupas/3.jpg" },
            { id: 4, name: "T-Shirt Estilo Único", description: "Confeccionada para refletir o teu espírito.", price: "15,00€", image: "Imagens/Roupas/4.png" },
            { id: 5, name: "Sweatshirt Vintage", description: "Inspirada nos guerreiros de outrora.", price: "25,00€", image: "Imagens/Roupas/5.jpg" },
            { id: 6, name: "T-Shirt Simbólica", description: "Confeccionada para refletir o teu espírito.", price: "15,00€", image: "Imagens/Roupas/6.png" },
            { id: 7, name: "CD Legião Lusitana", description: "CD 𝕷𝖊𝖌𝖎𝖆𝖔 𝕷𝖚𝖘𝖎𝖙𝖆𝖓𝖆 🇵🇹", price: "14,50€", image: "Imagens/Artigos/cds e autocolantes.jpg" },
            { id: 8, name: "T-Shirts Diversas", description: "Confeccionada para refletir o teu espírito.", price: "15,00€", image: "Imagens/Roupas/Camisolas.jpg" }
        ];

        let nextProductId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        let editingProductId = null; // Para manter o registo do produto a ser editado

        const renderProducts = () => {
            const grid = productListingsSection.querySelector('.grid-produtos');
            grid.innerHTML = ''; // Limpa os produtos atuais

            products.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('card-produto');
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="preco">${product.price} + 3€ (portes)</span>
                    <div class="product-actions" style="margin-top: 15px; display: flex; gap: 10px;">
                        <button class="botao-principal edit-btn" data-id="${product.id}">Editar</button>
                        <button class="botao-principal remove-btn" data-id="${product.id}" style="background: #dc3545;">Remover</button>
                    </div>
                `;
                grid.appendChild(card);
            });

            // Adiciona ouvintes de eventos para os novos botões
            grid.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', (e) => editProduct(parseInt(e.target.dataset.id)));
            });
            grid.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', (e) => removeProduct(parseInt(e.target.dataset.id)));
            });
        };

        const addProduct = (name, description, price, image) => {
            const newProduct = {
                id: nextProductId++,
                name,
                description,
                price,
                image
            };
            products.push(newProduct);
            renderProducts();
        };

        const updateProduct = (id, newName, newDescription, newPrice, newImage) => {
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex > -1) {
                products[productIndex] = {
                    ...products[productIndex],
                    name: newName,
                    description: newDescription,
                    price: newPrice,
                    image: newImage
                };
                renderProducts();
            }
        };

        const removeProduct = (id) => {
            if (confirm("Tem certeza que deseja remover este produto?")) {
                products = products.filter(product => product.id !== id);
                renderProducts();
            }
        };

        const editProduct = (id) => {
            editingProductId = id;
            const product = products.find(p => p.id === id);
            if (product) {
                document.getElementById('product-name').value = product.name;
                document.getElementById('product-description').value = product.description;
                document.getElementById('product-price').value = product.price;
                document.getElementById('product-image').value = product.image;
                document.getElementById('product-form-submit').textContent = 'Atualizar Produto';
                document.getElementById('product-form-title').textContent = 'Editar Produto';
            }
        };

        // Envio do formulário para criar/editar produtos
        document.getElementById('product-add-edit-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('product-name').value;
            const description = document.getElementById('product-description').value;
            const price = document.getElementById('product-price').value;
            const image = document.getElementById('product-image').value;

            if (editingProductId !== null) {
                updateProduct(editingProductId, name, description, price, image);
                editingProductId = null; // Reinicia o estado de edição
                document.getElementById('product-form-submit').textContent = 'Adicionar Produto';
                document.getElementById('product-form-title').textContent = 'Adicionar Novo Produto';
            } else {
                addProduct(name, description, price, image);
            }

            this.reset(); // Limpa o formulário
        });

        // Renderização inicial dos produtos quando a página carrega
        renderProducts();
    }
});