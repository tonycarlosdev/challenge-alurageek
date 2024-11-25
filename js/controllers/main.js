import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard({ nome, preco, imagem, id }) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
      <div class="img-container">
              <img src="${imagem}" alt="imagem produto">
      </div>
      <div class="card-container--info">
        <p>${nome}</p>
        <div class="card-container--value">
          <p>R$${preco},00</p>
          <button class="delete-button" data-id="${id}">
            <img src="/assets/Vector.png" alt="Eliminar">
          </button>
        </div>
      </div>      
    `;
  addDeleteEvent(card, id);
  return card;
}

function addDeleteEvent(card, id) {
  const deleteButton = card.querySelector(".delete-button");
  deleteButton.addEventListener("click", async () => {
    try {
      await servicesProducts.deleteProduct(id);
      card.remove();
      console.log(`Produto com id ${id} eliminado`);      
    } catch (error) {
      console.error(`Error ao eliminar o produto com id ${id}`, error);
    }
  });
}

const renderProducts = async () => {
  try {
    const listProducts = await servicesProducts.productList();
    listProducts.forEach((product) => {
      const productCard = createCard(product);  
      productContainer.appendChild(productCard);   
    });
  } catch (error) {
    console.log("Erro ao renderizar produtos: ", error);    
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.querySelector("[data-name]").value;
  const preco = document.querySelector("[data-price]").value;
  const imagem = document.querySelector("[data-image]").value;

  if(nome === "" || preco === "" || imagem === "") {
    alert("Por favor, preencha todos os campos");
  } else {
    try {
      const newProduct =await servicesProducts.createProduct(nome, preco, imagem);
      const newCard = createCard(newProduct);
      productContainer.appendChild(newCard);
    } catch (error) {
      console.log("Erro ao criar  o produto",error);    
    }
    form.reset();
  }  
});

renderProducts();
