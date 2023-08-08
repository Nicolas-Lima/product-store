import { createContext, useContext, useState, useEffect } from 'react'
import { AuthContext } from './auth'
import { db } from '../services/firebaseConnection'
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc
} from 'firebase/firestore'
import { removeAccents } from '../utils/generalUtils'
import {
  productAlreadyInList,
  productAlreadyInCart
} from '../utils/productsUtils'

const StoreContext = createContext({})

function StoreProvider({ children }) {
  const { user, userSigned, userUid, setUser, guestInfo, setGuestInfo } =
    useContext(AuthContext)
  const [userInfo, setUserInfo] = useState(null)
  const [products, setProducts] = useState(null)
  const [productsLoading, setProductsLoading] = useState(true)
  const [searchResults, setSearchResults] = useState([])

  const getProducts = async () => {
    const productsRef = collection(db, 'products')
    await getDocs(productsRef).then(snapshot => {
      const products = []
      snapshot.forEach(product =>
        products.push({ id: product.id, ...product.data() })
      )
      setProducts(products)
      setProductsLoading(false)
    })
  }

  useEffect(() => {
    const loadUserInfo = async () => {
      const userRef = doc(db, 'users', userUid)
      await getDoc(userRef).then(snapshot => {
        setUserInfo(snapshot.data())
      })
    }

    if (userSigned && userUid) {
      loadUserInfo()
    }

    getProducts()
  }, [])

  const getProductById = productId => {
    const product = products.filter(product => {
      return product.id === productId
    })[0]
    return product || null
  }

  const setProduct = async product => {
    if (!product) {
      return
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
      reviews
    } = product

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
      reviews
    }

    const productsRef = collection(db, 'products')
    await addDoc(productsRef, newProduct).then(docRef => {
      setProducts(prevState => [
        ...prevState,
        {
          id: docRef.id,
          ...newProduct
        }
      ])
    })
  }

  const searchProducts = (search = '') => {
    if (!productsLoading) {
      if (search.trim() !== '') {
        const productsFound = products.filter(product => {
          const strToLowerCase = str => str?.toLowerCase() || ''
          let { description = '', name = '', keywords = [] } = product
          ;[search, description, name, keywords] = [
            search,
            description,
            name
          ].map(item => removeAccents(strToLowerCase(item)))

          const searchFilter =
            description.includes(search) ||
            name.includes(search) ||
            keywords?.filter(keyword =>
              removeAccents(strToLowerCase(keyword)).includes(search)
            ).length > 0
          return searchFilter
        })
        setSearchResults(productsFound)
      } else if (products?.length > 0) {
        setSearchResults(products)
      }
    }
  }

  const updateUserInfo = async (updatedInfo = {}) => {
    try {
      const userRef = doc(db, 'users', userUid)

      await updateDoc(userRef, updatedInfo)
      setUser({
        ...user,
        ...updatedInfo
      })
    } catch (error) {}
  }

  const updateGuestInfo = (updatedInfo = {}) => {
    try {
      const updatedGuestInfo = {
        ...guestInfo,
        ...updatedInfo
      }
      setGuestInfo(updatedGuestInfo)

      localStorage.setItem('@guestData', JSON.stringify(updatedGuestInfo))
    } catch (error) {}
  }

  const addProductToList = async productUid => {
    const selectedProduct = getProductById(productUid)

    if (
      !selectedProduct ||
      productAlreadyInList(productUid, userSigned, user?.list)
    ) {
      return
    }

    if (userSigned) {
      const updatedList = [...user.list, selectedProduct]
      await updateUserInfo({
        list: updatedList
      })
    } else {
      const savedList =
        JSON.parse(localStorage.getItem('@guestData'))?.list ?? []

      const updatedList = [...savedList, selectedProduct]
      updateGuestInfo({
        list: updatedList
      })
    }
  }

  const removeProductFromList = async productUid => {
    const selectedProduct = getProductById(productUid)

    if (!selectedProduct) {
      return
    }

    if (userSigned) {
      const updatedList = [...user.list].filter(
        product => product.id !== productUid
      )

      await updateUserInfo({
        list: updatedList
      })
    } else {
      const savedList =
        JSON.parse(localStorage.getItem('@guestData'))?.list ?? []

      const updatedList = [...savedList].filter(
        product => product.id !== productUid
      )
      updateGuestInfo({
        list: updatedList
      })
    }
  }

  const addProductToCart = async productUid => {
    const selectedProduct = getProductById(productUid)
    const userCart = user?.cart ?? []

    if (
      !selectedProduct ||
      productAlreadyInCart(productUid, user?.cart) ||
      !userSigned
    ) {
      return
    }

    const updatedCart = [...userCart, selectedProduct]
    await updateUserInfo({
      cart: updatedCart
    })
  }

  const removeProductFromCart = async productUid => {
    const selectedProduct = getProductById(productUid)

    if (!selectedProduct) {
      return
    }

    if (userSigned) {
      const updatedCart = [...user.cart].filter(
        product => product.id !== productUid
      )

      await updateUserInfo({
        cart: updatedCart
      })
    }
  }

  const buyProduct = async productUid => {
    // a pessoa só pode comprar um pouco de produto

    // atualizar o purchasedProducts

    // userPurchasedProducts

    //

    const selectedProduct = getProductById(productUid)
    const userPurchasedProducts = user?.purchasedProducts ?? []

    if (
      !selectedProduct ||
      !userSigned
    ) {
      return
    }

    const updatedPurchasedProducts = [...userPurchasedProducts, selectedProduct]
    await updateUserInfo({
      purchasedProducts: updatedPurchasedProducts
    })
  }

  const contextValue = {
    products: products || [],
    setProducts,
    getProductById,
    setProduct,
    searchProducts,
    addProductToList,
    addProductToCart,
    removeProductFromList,
    removeProductFromCart,
    buyProduct,
    userPurchasedProducts: user?.purchasedProducts,
    userList: user?.list,
    userCart: user?.cart,
    guestList: guestInfo?.list,
    searchResults,
    productsLoading,
    userInfo
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
export { StoreContext }
