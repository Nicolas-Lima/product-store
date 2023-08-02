import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./auth";
import { db } from "../services/firebaseConnection";
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

const StoreContext = createContext({});

function StoreProvider({ children }) {
  const { userSigned, userUid } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const getProducts = async () => {
    const productsRef = collection(db, "products");
    await getDocs(productsRef).then(snapshot => {
      const products = [];
      snapshot.forEach(product =>
        products.push({ id: product.id, ...product.data() })
      );
      setProducts(products);
      setProductsLoading(false);
    });
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      const userRef = doc(db, "users", userUid);
      await getDoc(userRef).then(snapshot => {
        setUserInfo(snapshot.data());
      });
    };

    if (userSigned && userUid) {
      loadUserInfo();
    }

    getProducts();
  }, []);

  const getProductById = productId => {
    productId = parseInt(productId);
    const product = products.filter(
      product => product.id === productId
    )[0];
    return product;
  };

  const setProduct = async product => {
    if (!product) {
      return;
    }

    const {
      id,
      name,
      description,
      imgUrl,
      type,
      price,
      seller,
      minPurchaseUnits,
      maxPurchaseUnits,
      stock,
      keywords,
      empty,
      rating,
      reviews,
    } = product;
    const productsRef = collection(db, "products");
    await addDoc(productsRef, {
      id,
      name,
      description,
      imgUrl,
      type,
      price,
      seller,
      minPurchaseUnits,
      maxPurchaseUnits,
      stock,
      keywords,
      empty,
      rating,
      reviews,
    });
  };

  const searchProducts = (search = "") => {
    if (!productsLoading) {
      if (search.trim() !== "") {
        const productsFound = products.filter(product => {
          const strToLowerCase = str => str?.toLowerCase() || "";
          let { description = "", name = "", keywords = [] } = product;
          [search, description, name, keywords] = [
            search,
            description,
            name,
          ].map(item => strToLowerCase(item));

          const searchFilter =
            description.includes(search) ||
            name.includes(search) ||
            keywords?.filter(keyword =>
              strToLowerCase(keyword).includes(search)
            ).length > 0;
          return searchFilter;
        });
        setSearchResults(productsFound);
      } else if (products?.length > 0) {
        setSearchResults(products);
      }
    }
  };

  const contextValue = {
    products: products || [],
    setProducts,
    getProductById,
    setProduct,
    searchProducts,
    searchResults,
    productsLoading,
    userInfo,
    purchasedProducts: userInfo?.purchasedProducts,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
export { StoreContext };
