const BASE_URL = "http://localhost:3001/produtos";

const productList = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Erro ao buscar produtos: ", error);    
  }
}

const createProduct = async (nome, preco, imagem) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nome, preco, imagem})
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Erro ao criar produto: ", error);    
  }
};

const deleteProduct = async (id) => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`Produto com id ${id} deletado com sucesso`);
  } catch (error) {
    console.error("Erro na solicitude DELETE:", error);
  }
};

export const servicesProducts = {
  productList,
  createProduct,
  deleteProduct,
};