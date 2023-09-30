import { useState, useContext, useEffect, useRef } from 'react'
import Nav from '../../components/Nav'
import Products from '../../components/Products'
import { StoreContext } from '../../contexts/store'
import { BsSearch } from 'react-icons/bs'
import './home.css'

function Home() {
  const [search, setSearch] = useState('')
  const [lastSearch, setLastSearch] = useState(null)

  const searchInputRef = useRef(null)

  const { productsLoading, searchProducts, products } =
    useContext(StoreContext)

  const handleSearch = () => {
    if (search !== lastSearch) {
      searchProducts(search)
      setLastSearch(search)
    }
  }

  useEffect(() => {
    const handleKeyDown = e => {
      const searchInputIsFocused =
        document.activeElement === searchInputRef.current

      const key = e.key

      if (key === 'Enter') {
        if (searchInputIsFocused) {
          handleSearch()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleSearch])

  document.title = 'Product Store'

  return (
    <>
      <Nav />
      <main className="container">
        <div
          className={`searchContainer ${productsLoading && 'opacity-0'}`}>
          <input
            className="mt-4"
            type="search"
            placeholder="Pesquise por um produto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            data-theme="light"
            ref={searchInputRef}
          />
          {!productsLoading && (
            <button
              className="link-secondary shadow-none bg-transparent border-0"
              onClick={handleSearch}>
              <BsSearch size={26.5} />
            </button>
          )}
        </div>
        {products?.length > 0 || productsLoading ? (
          <Products />
        ) : (
          <h1 className="text-center text-danger mt-4">
            Não existem produtos!
          </h1>
        )}
      </main>
    </>
  )
}

export default Home
