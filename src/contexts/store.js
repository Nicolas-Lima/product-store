import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./auth";
import { db } from "../services/firebaseConnection";
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import { removeAccents } from "../utils/generalUtils";

const StoreContext = createContext({});

function StoreProvider({ children }) {
  const { user, userSigned, userUid, setUser, guestInfo, setGuestInfo } =
    useContext(AuthContext);
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
    const product = products.filter(product => {
      return product.id === productId;
    })[0];
    return product || null;
  };

  const setProduct = async product => {
    if (!product) {
      return;
    }

    const {
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

    const newProduct = {
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
    };

    const productsRef = collection(db, "products");
    await addDoc(productsRef, newProduct).then(docRef => {
      setProducts(prevState => [
        ...prevState,
        {
          id: docRef.id,
          ...newProduct,
        },
      ]);
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
          ].map(item => removeAccents(strToLowerCase(item)));

          const searchFilter =
            description.includes(search) ||
            name.includes(search) ||
            keywords?.filter(keyword =>
              removeAccents(strToLowerCase(keyword)).includes(search)
            ).length > 0;
          return searchFilter;
        });
        setSearchResults(productsFound);
      } else if (products?.length > 0) {
        setSearchResults(products);
      }
    }
  };

  const addProductToList = async productUid => {
    const selectedProduct = getProductById(productUid);

    if (!selectedProduct) return;

    if (userSigned) {
      const userRef = doc(db, "users", userUid);
      const updatedList = [...user.list, selectedProduct];
      updateDoc(userRef, {
        list: updatedList,
      });
      setUser({
        ...user,
        list: updatedList,
      });
    } else {
      const savedList =
        JSON.parse(localStorage.getItem("@guestData"))?.list ?? [];

      const updatedList = [...savedList, selectedProduct];
      const updatedGuestInfo = {
        ...guestInfo,
        list: updatedList,
      };
      setGuestInfo(updatedGuestInfo);

      localStorage.setItem("@guestData", JSON.stringify(updatedGuestInfo));
    }
  };

  const contextValue = {
    products: products || [],
    setProducts,
    getProductById,
    setProduct,
    searchProducts,
    addProductToList,
    userPurchasedProducts: user?.purchasedProducts,
    userList: user?.list,
    guestList: guestInfo?.list,
    searchResults,
    productsLoading,
    userInfo,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
export { StoreContext };
