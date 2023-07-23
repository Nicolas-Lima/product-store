import { useState } from "react";
import Nav from "../../components/Nav";

function Home() {
  const [search, setSearch] = useState("");
  return (
    <main className="container">
      <Nav />
      <input
        className="mt-4"
        type="search"
        placeholder="Pesquise por um produto..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        data-theme="light"
      />
    </main>
  );
}

export default Home;
