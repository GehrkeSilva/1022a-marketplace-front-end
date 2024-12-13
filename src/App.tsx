import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Tipo para produtos
type ProdutoType = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
};

// Tipo para itens do carrinho
type CarrinhoItemType = {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
};

// Componente Carrinho
function Carrinho({ carrinho, removerDoCarrinho }: { 
  carrinho: CarrinhoItemType[]; 
  removerDoCarrinho: (id: number) => void; 
}) {
  return (
    <div className="carrinho-container">
      <h2>Carrinho</h2>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {carrinho.map((item) => (
            <li key={item.id}>
              <div className="carrinho-item">
                <img src={item.imagem} alt="Imagem do produto no carrinho" />
                <p>
                  <strong>{item.nome}</strong> - {item.preco}
                </p>
                <button 
                  className="remover-item"
                  onClick={() => removerDoCarrinho(item.id)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/">
        <button className="voltar-home">Voltar para Produtos</button>
      </Link>
    </div>
  );
}

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [carrinho, setCarrinho] = useState<CarrinhoItemType[]>([]);

  // useEffect para carregar produtos e carrinho
  useEffect(() => {
    fetch("https://one022a-marketplace-39c3.onrender.com/produtos")
      .then((resposta) => resposta.json())
      .then((dados) => setProdutos(dados));

    fetch("https://one022a-marketplace-39c3.onrender.com/carrinho")
      .then((resposta) => resposta.json())
      .then((dados) => setCarrinho(dados));
  }, []);

  // Função para adicionar produto ao carrinho
  const adicionarAoCarrinho = async (produto: ProdutoType) => {
    try {
      const response = await fetch("https://one022a-marketplace-39c3.onrender.com/carrinho", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: produto.nome,
          preco: produto.preco,
          imagem: produto.imagem,
        }),
      });

      if (response.ok) {
        const novoItem = await response.json();
        setCarrinho([...carrinho, novoItem]);
      } else {
        console.error("Erro ao adicionar ao carrinho:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
    }
  };

  // Função para remover produto do carrinho
  const removerDoCarrinho = async (id: number) => {
    try {
      const response = await fetch(`https://one022a-marketplace-39c3.onrender.com/carrinho/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCarrinho(carrinho.filter((item) => item.id !== id));
      } else {
        console.error("Erro ao remover do carrinho:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
    }
  };

  return (
    <>
      <header className="site-header">
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/carrinho">Carrinho</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        {/* Página Principal */}
        <Route
          path="/"
          element={
            <div className="produtos-container">
              <h1 className="titulo-produto">Produtos</h1>
              <div className="produtos-list">
                {produtos.map((produto) => (
                  <div key={produto.id} className="produto-item">
                    <h3 className="produto-nome">{produto.nome}</h3>
                    <div className="container-imagem">
                      <img src={produto.imagem} alt="Imagem do produto" />
                    </div>
                    <p className="produto-preco">{produto.preco}</p>
                    <p className="produto-descricao">{produto.descricao}</p>
                    <button
                      className="botao-comprar"
                      onClick={() => adicionarAoCarrinho(produto)}
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                ))}
              </div>
            </div>
          }
        />
        {/* Página do Carrinho */}
        <Route path="/carrinho" element={<Carrinho carrinho={carrinho} removerDoCarrinho={removerDoCarrinho} />} />
      </Routes>
    </>
  );
}

export default App;
