import { createContext, useState, useEffect } from "react";

const StoreContext = createContext({});

function StoreProvider({ children }) {
  const [products, setProducts] = useState([
    {
      name: "óculos de sol",
      imgUrl: "https://aa.com",
      type: "Beleza",
      price: 10,
      seller: "A & B",
      minPurchaseUnits: 1,
      maxPurchaseUnits: 3,
      stock: "inglês",
    },
  ]);

  useEffect(() => {}, []);

  const contextValue = { products, setProducts };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
export { StoreContext };
