import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
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
  const {
    user,
    userSigned,
    userUid,
    guestInfo,
    setGuestInfo,
    updateUserInfo
  } = useContext(AuthContext)
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

      const productsWithStock = products?.filter(
        product => product.stock > 0
      )
      const productsWithNoStock = products?.filter(
        product => product.stock <= 0
      )
      const updatedProductList = [
        ...productsWithStock,
        ...productsWithNoStock
      ]

      setProducts(updatedProductList)
      setProductsLoading(false)
    })
  }

  const updateProductsOrderStatus = async () => {
    const userPurchasedProducts = user?.purchasedProducts

    const getUpdatedOrderStatus = ({
      purchaseTimestamp,
      updatedDay,
      orderStatus,
      statusIndex
    }) => {
      const purchaseDate = new Date(purchaseTimestamp)
      const [purchaseMonth, purchaseYear] = [
        purchaseDate.getMonth(),
        purchaseDate.getFullYear()
      ]

      const daysInAMonth = 30

      if (updatedDay > daysInAMonth) {
        const lastStatusMonth =
          orderStatus[statusIndex - 1]?.done?.date?.month

        let updatedYear = purchaseYear
        let updatedMonth = lastStatusMonth + 1

        if (lastStatusMonth + 1 > 12) {
          updatedYear = purchaseYear + 1
          updatedMonth = 1
        }

        updatedDay = updatedDay - 30

        return {
          value: true,
          date: {
            day: updatedDay,
            month: updatedMonth,
            year: updatedYear
          }
        }
      }

      return {
        value: true,
        date: {
          day: updatedDay,
          month: purchaseMonth,
          year: purchaseYear
        }
      }
    }

    const updatedPurchasedProducts =
      Array.isArray(userPurchasedProducts) &&
      userPurchasedProducts?.map(purchasedProduct => {
        const updatedOrderStatus = purchasedProduct?.orderStatus

        const purchaseTimestamp = purchasedProduct?.timestamp
        const purchaseDate = new Date(purchaseTimestamp)
        const currentDate = new Date()
        const [purchaseDay, purchaseMonth] = [
          purchaseDate.getDate(),
          purchaseDate.getMonth()
        ]
        const [currentDay, currentMonth] = [
          currentDate.getDate(),
          currentDate.getMonth()
        ]

        const daysSincePurchase =
          30 * (currentMonth - purchaseMonth) - purchaseDay + currentDay

        if (daysSincePurchase >= 2 && !updatedOrderStatus[1].done) {
          updatedOrderStatus[1].done = getUpdatedOrderStatus({
            purchaseTimestamp,
            updatedDay: purchaseDay + 2,
            orderStatus: purchasedProduct?.orderStatus,
            statusIndex: 1
          })
        }

        if (daysSincePurchase >= 3 && !updatedOrderStatus[2].done) {
          updatedOrderStatus[2].done = getUpdatedOrderStatus({
            purchaseTimestamp,
            updatedDay: purchaseDay + 3,
            orderStatus: purchasedProduct?.orderStatus,
            statusIndex: 2
          })
        }

        if (daysSincePurchase >= 10 && !updatedOrderStatus[3].done) {
          updatedOrderStatus[3].done = getUpdatedOrderStatus({
            purchaseTimestamp,
            updatedDay: purchaseDay + 10,
            orderStatus: purchasedProduct?.orderStatus,
            statusIndex: 3
          })
        }

        return {
          ...purchasedProduct,
          updatedOrderStatus
        }
      })

    const userRef = doc(db, 'users', userUid)

    await updateDoc(userRef, {
      purchasedProducts: updatedPurchasedProducts
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

  useEffect(() => {
    if (userSigned) {
      updateProductsOrderStatus()
    }
  }, [user, userSigned])

  const getProductById = productId => {
    const product = products?.filter(product => {
      return product.id === productId
    })[0]
    return product || null
  }

  const getPurchasedProductByOrderId = orderId => {
    const purchasedProducts = user?.purchasedProducts || []

    const purchasedProduct = purchasedProducts?.filter(
      purchasedProduct => {
        return purchasedProduct.orderId === orderId
      }
    )[0]
    return purchasedProduct || null
  }

  const updateProductState = (productId, updatedInfo) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          ...updatedInfo
        }
      }
      return product
    })

    setProducts(updatedProducts)
  }

  const updateProduct = async (productId, updatedInfo) => {
    const productRef = doc(db, 'products', productId)
    await updateDoc(productRef, updatedInfo)
  }

  const updateCanProvideReview = async (orderId, productUid) => {
    const userPurchasedProducts = user?.purchasedProducts
    const purchasedProduct = userPurchasedProducts.filter(
      purchasedProduct => purchasedProduct.orderId === orderId
    )[0]

    if (purchasedProduct) {
      purchasedProduct.canProvideReview = false

      await updateUserInfo({
        purchasedProducts: userPurchasedProducts
      })
    }
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
      toast.success('Produto adicionado à lista!', {
        toastId: `productAddedToList-${productUid}`
      })
    } else {
      const savedList =
        JSON.parse(localStorage.getItem('@guestData'))?.list ?? []

      const updatedList = [...savedList, selectedProduct]
      updateGuestInfo({
        list: updatedList
      })
      toast.success('Produto adicionado à lista!', {
        toastId: `productAddedToList-${productUid}`
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
    toast.success('Produto adicionado ao carrinho!', {
      toastId: `productAddedToCart-${productUid}`,
      autoClose: 1000
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

  const buyProduct = async ({
    productId,
    cardId,
    cardNumberLastFoursDigits,
    paymentMethod,
    totalPrice,
    amount,
    deliveryAddress
  }) => {
    const selectedProduct = getProductById(productId)
    const userPurchasedProducts = user?.purchasedProducts || []

    if (!selectedProduct || !userSigned) {
      return {
        status: 'error'
      }
    }

    if (paymentMethod === 'credit_card') {
      const userRef = doc(db, 'users', userUid)
      const creditCardsCollectionRef = collection(userRef, 'creditCards')
      const creditCard = await getDoc(
        doc(creditCardsCollectionRef, cardId)
      ).then(snapshot => snapshot.data())
    }

    let updatedProductStock = selectedProduct?.stock - amount
    updatedProductStock =
      updatedProductStock <= 0 ? 0 : updatedProductStock

    const timestamp = Date.now()
    const currentDate = new Date()
    const [
      currentSeconds,
      currentMinutes,
      currentMonth,
      currentDay,
      currentYear
    ] = [
      currentDate.getSeconds(),
      currentDate.getMinutes(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getFullYear()
    ]

    const trackingId = `${userUid.slice(
      -5
    )}${productId}${currentSeconds}${currentMinutes}${String(
      Math.random()
    ).replace('.', '')}${timestamp}`

    const { description, imgUrl, name, seller, price, rating } =
      selectedProduct

    const purchasedProduct = {
      canProvideReview: true,
      productId: selectedProduct.id,
      orderStatus: [
        {
          statusName: 'Pedido recebido',
          statusId: 1,
          done: {
            value: true,
            date: {
              day: currentDay,
              month: currentMonth,
              year: currentYear
            }
          }
        },
        {
          statusName: 'Preparando o pedido',
          statusId: 2,
          done: false
        },

        {
          statusName: 'Em trânsito',
          statusId: 3,
          done: false
        },
        {
          statusName: 'Entregue',
          statusId: 4,
          done: false
        }
      ],
      trackingId,
      orderId: trackingId,
      paymentMethod,
      cardId: cardId ?? false,
      cardNumberLastFoursDigits: cardNumberLastFoursDigits ?? false,
      totalPrice,
      amount,
      description,
      imgUrl,
      productName: name,
      seller,
      price,
      rating,
      timestamp,
      deliveryAddress
    }

    const updatedPurchasedProducts = [
      ...userPurchasedProducts,
      purchasedProduct
    ]

    await updateUserInfo({
      purchasedProducts: updatedPurchasedProducts
    })

    // Update the product stock

    const productRef = doc(db, 'products', productId)

    await updateDoc(productRef, {
      stock: updatedProductStock
    })

    updateProductState(productId, {
      stock: updatedProductStock
    })

    const isProductInUserList = productAlreadyInList(
      productId,
      userSigned,
      user?.list
    )

    const isProductInCart = productAlreadyInCart(productId, user?.cart)

    if (isProductInUserList) {
      await removeProductFromList(productId)
    }

    if (isProductInCart) {
      await removeProductFromCart(productId)
    }

    return {
      status: 'success'
    }
  }

  function brandNameAlreadyExists(newBrandName) {
    return new Promise(async (resolve, reject) => {
      newBrandName = newBrandName.toLowerCase()

      const brandNamesRef = doc(db, 'sellers', 'brandNames')
      const brandNames = await getDoc(brandNamesRef)
        .then(docSnap => docSnap?.data()?.brandNames ?? [])
        .catch(error => [])
      const brandNameAlreadyExists = !!brandNames?.find(
        brandName =>
          brandName?.toLowerCase() === newBrandName?.toLowerCase()
      )
      resolve(brandNameAlreadyExists)
      reject('error')
    })
  }

  const contextValue = {
    brandNameAlreadyExists,
    products: products || [],
    setProducts,
    getProductById,
    getPurchasedProductByOrderId,
    setProduct,
    searchProducts,
    addProductToList,
    addProductToCart,
    removeProductFromList,
    removeProductFromCart,
    buyProduct,
    updateProduct,
    updateProductState,
    updateCanProvideReview,
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
