import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";

// Tipo para produtos
type ProdutoType = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
  marca: string;
  quantidade: number;
};

// Tipo para itens do carrinho
type CarrinhoItemType = {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
};

function Carrinho({
  carrinho,
  removerDoCarrinho,
  finalizarCompra,
}: {
  carrinho: CarrinhoItemType[];
  removerDoCarrinho: (id: number) => void;
  finalizarCompra: () => void;
}) {
  // Função para calcular o valor total do carrinho
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + parseFloat(item.preco.replace("R$", "").replace(",", ".")), 0);
  };

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
      <div className="total-carrinho">
        <strong>Total: R${calcularTotal().toFixed(2)}</strong>
      </div>
      <button className="finalizar-compra" onClick={finalizarCompra}>
        Finalizar Compra
      </button>
      <Link to="/">
        <button className="voltar-home">Voltar para Produtos</button>
      </Link>
    </div>
  );
}

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [carrinho, setCarrinho] = useState<CarrinhoItemType[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [comprasRealizadas, setComprasRealizadas] = useState(false);
  const location = useLocation(); // Hook para obter a rota atual

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

  // Função para finalizar a compra
  const finalizarCompra = () => {
    setPopupVisible(true);
  };

  // Função para processar a compra
  const processarCompra = () => {
    // Limpar o carrinho após a compra
    setCarrinho([]);
    setPopupVisible(false);
    setComprasRealizadas(true);
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
            <li>
              <Link to="/produtos">Cadastro</Link>
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
            <p className="produto-marca">Marca: {produto.marca}</p>
            <p className="produto-quantidade">Quantidade: {produto.quantidade}</p>
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
        <Route
          path="/carrinho"
          element={
            <Carrinho
              carrinho={carrinho}
              removerDoCarrinho={removerDoCarrinho}
              finalizarCompra={finalizarCompra}
            />
          }
        />
      </Routes>

      {/* Pop-up de Finalização de Compra */}
      {popupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h3>Finalizar Compra</h3>
            <form>
              <label>
                Nome:
                <input type="text" required />
              </label>
              <label>
                Endereço:
                <input type="text" required />
              </label>
              <button type="button" onClick={processarCompra}>
                Comprar
              </button>
            </form>
            <button onClick={() => setPopupVisible(false)}>Fechar</button>
          </div>
        </div>
      )}

      {/* Mensagem de Compra Realizada (somente na página do carrinho) */}
      {comprasRealizadas && location.pathname === "/carrinho" && (
        <div className="mensagem-compra">
          <p>Compra realizada com sucesso!</p>
        </div>
      )}
    </>
  );
}

export default App;
