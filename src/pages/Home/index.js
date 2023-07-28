import { useState } from "react";
import Nav from "../../components/Nav";
import Products from "../../components/Products";

function Home() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Nav />
      <main className="container">
        <input
          className="mt-4"
          type="search"
          placeholder="Pesquise por um produto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          data-theme="light"
        />
        <Products />
      </main>
    </>
  );
}

export default Home;
