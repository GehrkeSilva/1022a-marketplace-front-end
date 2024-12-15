import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function CadastroProduto() {
    const navigate = useNavigate();
    const [produto, setProduto] = useState({
        id: "",
        nome: "",
        descricao: "",
        preco: "",
        imagem: "",
        marca: "",
        quantidade:"",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduto({ ...produto, [name]: value });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(produto),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                alert(`Erro ao cadastrar produto: ${errorMessage}`);
            } else {
                alert("Produto cadastrado com sucesso!");
                navigate("/");
            }
        }catch (error) {
            console.error("Erro ao cadastrar o produto:", error);
            alert("Erro ao conectar ao servidor. Por favor, tente novamente mais tarde.");
        }
        
    };

    return (
        <>
            <h1>Cadastro de Produtos</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="id"
                        placeholder="Id"
                        value={produto.id}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={produto.nome}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="descricao"
                        placeholder="Descrição"
                        value={produto.descricao}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="preco"
                        placeholder="Preço"
                        value={produto.preco}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="imagem"
                        placeholder="URL da Imagem"
                        value={produto.imagem}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </>
    );
}

export default CadastroProduto;