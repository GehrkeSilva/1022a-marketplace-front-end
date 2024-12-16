import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductRegistration() {
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [productBrand, setProductBrand] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("https://one022a-marketplace-39c3.onrender.com/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: productId,
          nome: productName,
          descricao: productDescription,
          preco: productPrice,
          imagem: productImage,
          quantidade: stockQuantity,
          marca: productBrand,
        }),
      });

      if (response.status !== 500) {
        alert("Produto cadastrado com sucesso!");
        navigate("/");
      } else {
        const errorMessage = await response.text();
        alert("Erro ao cadastrar produto: " + errorMessage);
      }
    } catch (error) {
      console.error(error);
      alert("Falha ao conectar com o servidor.");
    }
  };

  const handleProductIdChange = (event: ChangeEvent<HTMLInputElement>) => setProductId(event.target.value);
  const handleProductNameChange = (event: ChangeEvent<HTMLInputElement>) => setProductName(event.target.value);
  const handleProductDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => setProductDescription(event.target.value);
  const handleProductPriceChange = (event: ChangeEvent<HTMLInputElement>) => setProductPrice(event.target.value);
  const handleProductImageChange = (event: ChangeEvent<HTMLInputElement>) => setProductImage(event.target.value);
  const handleStockQuantityChange = (event: ChangeEvent<HTMLInputElement>) => setStockQuantity(event.target.value);
  const handleProductBrandChange = (event: ChangeEvent<HTMLInputElement>) => setProductBrand(event.target.value);

  return (
    <>
      <h1>Cadastro de Produto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="ID do produto"
            type="text"
            name="id"
            id="id"
            onChange={handleProductIdChange}
          />
        </div>
        <div>
          <input
            placeholder="Nome do produto"
            type="text"
            name="nome"
            id="nome"
            onChange={handleProductNameChange}
          />
        </div>
        <div>
          <input
            placeholder="Descrição do produto"
            type="text"
            name="descricao"
            id="descricao"
            onChange={handleProductDescriptionChange}
          />
        </div>
        <div>
          <input
            placeholder="Preço do produto"
            type="text"
            name="preco"
            id="preco"
            onChange={handleProductPriceChange}
          />
        </div>
        <div>
          <input
            placeholder="URL da imagem"
            type="text"
            name="imagem"
            id="imagem"
            onChange={handleProductImageChange}
          />
        </div>
        <div>
          <input
            placeholder="Quantidade em estoque"
            type="text"
            name="quantidade"
            id="quantidade"
            onChange={handleStockQuantityChange}
          />
        </div>
        <div>
          <input
            placeholder="Marca do produto"
            type="text"
            name="marca"
            id="marca"
            onChange={handleProductBrandChange}
          />
        </div>
        <input type="submit" value="Cadastrar Produto" />
      </form>
    </>
  );
}

export default ProductRegistration;
