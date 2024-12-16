import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterProduct() {
  const navigateTo = useNavigate();
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: "",
    brand: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("https://one022a-marketplace-39c3.onrender.com/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formValues.id,
          nome: formValues.name,
          descricao: formValues.description,
          preco: formValues.price,
          imagem: formValues.imageUrl,
          quantidade: formValues.stock,
          marca: formValues.brand,
        }),
      });

      if (response.ok) {
        alert("Produto registrado com sucesso!");
        navigateTo("/");
      } else {
        const errorText = await response.text();
        alert(`Erro ao registrar o produto: ${errorText}`);
      }
    } catch (error) {
      console.error("Erro na conexão com o servidor:", error);
      alert("Não foi possível completar a requisição.");
    }
  };

  return (
    <>
      <h1>Registro de Produto</h1>
      <form onSubmit={handleFormSubmit}>
        {[
          { placeholder: "ID do produto", name: "id" },
          { placeholder: "Nome do produto", name: "name" },
          { placeholder: "Descrição do produto", name: "description" },
          { placeholder: "Preço do produto", name: "price" },
          { placeholder: "URL da imagem", name: "imageUrl" },
          { placeholder: "Quantidade em estoque", name: "stock" },
          { placeholder: "Marca do produto", name: "brand" },
        ].map(({ placeholder, name }) => (
          <div key={name}>
            <input
              type="text"
              placeholder={placeholder}
              name={name}
              value={formValues[name as keyof typeof formValues]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <input type="submit" value="Cadastrar Produto" />
      </form>
    </>
  );
}

export default RegisterProduct;
