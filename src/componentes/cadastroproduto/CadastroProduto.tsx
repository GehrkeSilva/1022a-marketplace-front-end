import {  ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from 'react-router-dom';
function CadastroProduto(){
    const navigate = useNavigate()
    const [id,setId] = useState("")
    const [nome,setNome] = useState("")
    const [descricao,setDescricao] = useState("")
    const [preco,setPreco] = useState("")
    const [imagem,setImagem] = useState("")
    const [quantidade,setQuantidade] = useState("")
    const [marca,setMarca] = useState("")
    async function handleForm(event:FormEvent){
        event.preventDefault()
        try{
            const resposta = await fetch("http://localhost:8000/produtos",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id:id,
                    nome:nome,
                    descricao:descricao,
                    preco:preco,
                    imagem:imagem,
                    quantidade:quantidade,
                    marca:marca
                })
            })
            if(resposta.status!=500){
                alert("Produto Cadastro com Sucesso")
                navigate("/")
            }
            else{
                const mensagem = await resposta.text()
                alert("Erro ao Cadastrar Produto - Error: "+mensagem)
            }
        }
        catch(e) {
            console.error(e); // Para registrar o erro no console
            alert("Servidor não está respondendo.");
        }
          
        
    }
    function handleId(event:ChangeEvent<HTMLInputElement>){
        setId(event.target.value)
    }
    function handleNome(event:ChangeEvent<HTMLInputElement>){
        setNome(event.target.value)
    }
    function handleDescricao(event:ChangeEvent<HTMLInputElement>){
        setDescricao(event.target.value)
    }
    function handlePreco(event:ChangeEvent<HTMLInputElement>){
        setPreco(event.target.value)
    }
    function handleImagem(event:ChangeEvent<HTMLInputElement>){
        setImagem(event.target.value)
    }
    function handleQuantidade(event:ChangeEvent<HTMLInputElement>){
        setQuantidade(event.target.value)
    }
    function handleMarca(event:ChangeEvent<HTMLInputElement>){
        setMarca(event.target.value)
    }
    return(
        <>
            <h1>Meu Componente de Cadastro de Produtos</h1>
            <form onSubmit={handleForm}>
                <div>
                    <input placeholder="Id" type="text" name="id" id="id" onChange={handleId} />
                </div>
                <div>
                    <input placeholder="Nome" type="text" name="nome" id="nome" onChange={handleNome} />
                </div>
                <div>
                    <input placeholder="Descrição" type="text" name="descricao" id="descricao" onChange={handleDescricao} />
                </div>
                <div>
                    <input placeholder="Preço" type="text" name="preco" id="preco" onChange={handlePreco} />
                </div>
                <div>
                    <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" onChange={handleImagem} />
                </div>
                <div>
                    <input placeholder="Quantidade Estoque" type="text" name="quantidade" id="quantidade" onChange={handleQuantidade} />
                </div>
                <div>
                    <input placeholder="Marca Produto" type="text" name="marca" id="marca" onChange={handleMarca} />
                </div>
                <input type="submit" value="Cadastrar" />
            </form>
        </>
    )
}

export default CadastroProduto