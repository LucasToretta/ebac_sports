import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'
import { addToCart } from './features/cart/cartSlice'
import { RootState } from './app/store'
import { useGetProductsQuery } from './features/cart/cartApi'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const [favoritos, setFavoritos] = useState<Produto[]>([])
  const carrinho = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()

  const { data: produtos = [], isLoading, isError } = useGetProductsQuery()

  function adicionarAoCarrinho(produto: Produto) {
    if (carrinho.find((p) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(addToCart(produto))
    }
  }

  function favoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      const favoritosSemProduto = favoritos.filter((p) => p.id !== produto.id)
      setFavoritos(favoritosSemProduto)
    } else {
      setFavoritos([...favoritos, produto])
    }
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />

        {isLoading && <p>Carregando produtos...</p>}
        {isError && <p>Erro ao carregar produtos 😢</p>}
        {!isLoading && !isError && produtos.length === 0 && (
          <p>Nenhum produto encontrado.</p>
        )}

        {!isLoading && !isError && produtos.length > 0 && (
          <Produtos
            produtos={produtos.map((p) => ({
              id: p.id,
              nome: p.title,
              preco: p.preco,
              imagem: p.imagem
            }))}
            favoritos={favoritos}
            favoritar={favoritar}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        )}
      </div>
    </>
  )
}

export default App
