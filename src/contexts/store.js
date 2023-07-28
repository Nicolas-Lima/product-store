import { createContext, useState, useEffect } from "react";

const StoreContext = createContext({});

function StoreProvider({ children }) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "A única coisa",
      description:
        "This is a fascinating book about something extraordinary.",
      imgUrl:
        "https://m.media-amazon.com/images/I/41o+ibXhIgL._SY344_BO1,204,203,200_.jpg",
      type: "Paper",
      price: {
        dollars: 10,
        cents: 50,
      },
      seller: "A & B",
      minPurchaseUnits: 2,
      maxPurchaseUnits: 2,
      stock: 5,
      keywords: ["livro", "livro unica coisa"],
      empty: false,
    },
    {
      id: 2,
      name: "óculos de sol",
      description: "Stylish sunglasses that provide UV protection.",
      imgUrl:
        "https://m.media-amazon.com/images/I/31S41ebtGzL._AC_SX679_.jpg",
      type: "Beleza",
      price: {
        dollars: 110,
        cents: 20,
      },
      seller: "A & B",
      minPurchaseUnits: 1,
      maxPurchaseUnits: 3,
      stock: 4,
      keywords: ["oculos", "oculos de sol"],
      empty: false,
    },
    {
      id: 3,
      name: "óculos de sol",
      description: "Trendy sunglasses for a cool and fashionable look.",
      imgUrl:
        "https://m.media-amazon.com/images/I/31S41ebtGzL._AC_SX679_.jpg",
      type: "Beleza",
      price: {
        dollars: 50,
        cents: 50,
      },
      seller: "A & B",
      minPurchaseUnits: 1,
      maxPurchaseUnits: 3,
      stock: 4,
      keywords: ["oculos", "oculos de sol"],
      empty: false,
    },
    {
      id: 4,
      name: "óculos de sol",
      description: "Classic sunglasses that never go out of style.",
      imgUrl:
        "https://m.media-amazon.com/images/I/31S41ebtGzL._AC_SX679_.jpg",
      type: "Beleza",
      price: {
        dollars: 20,
        cents: 0,
      },
      seller: "A & B",
      minPurchaseUnits: 1,
      maxPurchaseUnits: 3,
      stock: 4,
      keywords: ["oculos", "oculos de sol"],
      empty: false,
    },
  ]);

  const getProducts = () => {};

  const getProductById = productId => {
    productId = parseInt(productId)
    const product = products.filter(product => product.id === productId)[0];
    return product;
  };

  const contextValue = { products, setProducts, getProductById };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
export { StoreContext };
