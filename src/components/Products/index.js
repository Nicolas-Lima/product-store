import Product from "../Product";

function Products() {
  return (
    <div class="grid" data-theme="light">
      <Product
        title="A única coisa"
        imgUrl="https://m.media-amazon.com/images/I/41o+ibXhIgL._SY344_BO1,204,203,200_.jpg"
        alt="livro-unica-coisa"
      />

      <Product
        title="Óculos de sol"
        imgUrl="https://m.media-amazon.com/images/I/31S41ebtGzL._AC_SX679_.jpg"
        alt="oculos-de-sol"
      />

      <Product
        title="Chaleira elétrica"
        imgUrl="https://m.media-amazon.com/images/I/517c17in3RL._AC_SX569_.jpg"
        alt="chaleira-eletrica"
      />
    </div>
  );
}

export default Products;
