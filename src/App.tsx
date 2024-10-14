import { useEffect, useState } from 'react'
import './App.css'
type ProdutoType = {
  id:number,
  nome:string,
  preco:string,
  descricao:string,
  imagem:string
}
function App() {
  const [nome,setNome] = useState("")
  const [produtos, setProdutos] = useState<ProdutoType []>([

  ])
  useEffect(()=>{
    setNome("Diego Barros")
  },[])
  fetch("https://one022a-marketplace-39c3.onrender.com/produtos")
  .then(resposta=>resposta.json())
  .then(dados=>setProdutos(dados))
  return (
    <>
     <h1>{nome}</h1>
     <div className="produtos-container">
      {
        produtos.map(produto=>{
          return(<div className="produto-item">
            <h1>{produto.nome}</h1>
            <p>{produto.imagem}</p>
            <img src={produto.imagem} alt="imagem" />
            <p>{produto.preco}</p>
            <p>{produto.descricao}</p>
          </div>)
        })
      }
     </div>
    </>
  )
}

export default App
