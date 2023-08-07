import { useState, useContext } from "react";
import Nav from "../../components/Nav";
import Products from "../../components/Products";
import { StoreContext } from "../../contexts/store";
import { BsSearch } from "react-icons/bs";
import "./home.css";

function Home() {
  const [search, setSearch] = useState("");

  const { productsLoading, searchProducts, setProduct } =
    useContext(StoreContext);

  const handleSearch = () => {
    searchProducts(search);
  };

  return (
    <>
      <Nav />
      <main className="container">
        <div
          className={`searchContainer ${productsLoading && "opacity-0"}`}>
          <input
            className="mt-4"
            type="search"
            placeholder="Pesquise por um produto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            data-theme="light"
          />
          {!productsLoading && (
            <button
              className="link-secondary shadow-none bg-transparent border-0"
              onClick={handleSearch}>
              <BsSearch size={26.5} />
            </button>
          )}
        </div>
        <Products />
      </main>
    </>
  );
}

export default Home;
