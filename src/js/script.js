const ulListaProdutos = document.querySelector('.containerListaProdutos ul')

const montarVitrineProdutos = (listaProdutos) => {
    ulListaProdutos.innerHTML = ''

    listaProdutos.forEach((produto) => {
        const li = document.createElement('li')
        let valorItens = ''

        if(produto.promocao){
            valorItens = produto.precoPromocao
        } else {
            valorItens = produto.preco
        }

        const ol = document.createElement('ol')  
        
        li.innerHTML = `
                <img src="${produto.img}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>${valorItens}</p>
                <span>${produto.secao}</span>
                <ol></ol>
                <button class="botoes_produtos" id="${produto.id}">Adicionar no Carrinho</button>
        `
        produto.componentes.forEach((listasComponentes) => {
            const olComponentes = document.createElement('li')
            olComponentes.innerText = listasComponentes
            li.children[4].append(olComponentes)
        })
        
        ulListaProdutos.append(li)
    })
}

montarVitrineProdutos(produtos)

//FILTROS

const filtrarPorHortifruti = () => {
    const listaHortifruti = produtos.filter((produto) => {
        return produto.secao === 'Hortifruti'
    })

    montarVitrineProdutos(listaHortifruti)
}

const botaoMostrarHortifruti = document.querySelector('.estiloGeralBotoes--filtrarHortifruti')
botaoMostrarHortifruti.addEventListener('click', filtrarPorHortifruti)

const mostrarTodos = () => {

    return montarVitrineProdutos(produtos)

}

const botaoMostrarTodos = document.querySelector('.estiloGeralBotoes--mostrarTodos')
botaoMostrarTodos.addEventListener('click', mostrarTodos)

const buscarProdutos = () => {
    const imput = document.querySelector('.campoBuscaPorNome') 
    let busca = imput.value.toLowerCase()   

    const buscaProdutos = produtos.filter((produto) => {
        if(produto.nome.toLowerCase() === busca){
            return produto
        }
        if(produto.categoria.toLowerCase() === busca){
            return produto
        }
        if(produto.secao.toLowerCase() === busca){
            return produto
        }
    })

    montarVitrineProdutos(buscaProdutos)
    
}

const botaoBusca = document.querySelector('.estiloGeralBotoes--botaoBuscaPorNome')
botaoBusca.addEventListener('click', buscarProdutos)

//CARRINHO

const vitrinePrincipal = document.querySelector('.vitrine_principal')
const vitrineCarrinho = document.querySelector('.vitrine_carrinho')

vitrinePrincipal.addEventListener('click', addProdutoCarrinho)

function addProdutoCarrinho(event){
    const btnComprar = event.target

    if(btnComprar.tagName == 'BUTTON'){
        const cardProduto = btnComprar.closest('li')
        const cardProdutoClone = cardProduto.cloneNode(true)
        vitrineCarrinho.appendChild(cardProdutoClone)
        carrinho.addProduto(btnComprar.id)
    }
}

const carrinho = {
    produtosCarrinho: [],
    precoTotal: 0,
    tagPrecoTotal: document.getElementById('precoTotal'),

    addProduto(produtoId){
       const produto = produtos.find((produto) => produto.id === Number(produtoId))
       this.produtosCarrinho.push(produto)
       console.log(produto)
       this.totalPreco()
       return true
    },
    totalPreco(){
       const totalCarrinho = this.produtosCarrinho.reduce(function(soma, produto){

        if(produto.promocao){
            return soma + Number(produto.precoPromocao)
        }else{
            return soma + Number(produto.preco)
        }

       }, 0)
       
       this.precoTotal = totalCarrinho
       this.tagPrecoTotal.innerText = this.precoTotal
       
    }
}
