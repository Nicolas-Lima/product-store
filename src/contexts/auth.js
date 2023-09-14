import { useState, useEffect, createContext } from 'react'
import { toast } from 'react-toastify'
import Loading from '../components/LoadingSpinner'
import FirebaseError from '../components/FirebaseError'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../services/firebaseConnection'
import {
  getAuthErrorMessage,
  getCreateAccountErrorMessage
} from '../utils/validationUtils'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'

import {
  addDoc,
  setDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion
} from 'firebase/firestore'

const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [seller, setSeller] = useState(null)
  const [hasSellerAccount, setHasSellerAccount] = useState(
    seller instanceof Object
  )
  const [firebaseError, setFirebaseError] = useState(false)
  const [guestInfo, setGuestInfo] = useState(null)
  const [pageLoading, setPageLoading] = useState(true)
  const [loggingIn, setLoggingIn] = useState(false)
  const [registering, setRegistering] = useState(false)

  const navigate = useNavigate()

  const getUserData = async uid => {
    const userRef = doc(db, 'users', uid)
    try {
      const snapshot = await getDoc(userRef)
      const userData = snapshot.data()
      return userData
    } catch (error) {
      if (error.code === 'unavailable') {
        setFirebaseError(true)
      }
    }
  }

  const getSellerData = async uid => {
    const sellerRef = doc(db, 'sellers', uid)
    try {
      const snapshot = await getDoc(sellerRef)
      const sellerData = snapshot.data()
      return sellerData
    } catch (error) {
      if (error.code === 'unavailable') {
        setFirebaseError(true)
      }
    }
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('@userData')) || ''

    if (userData && userData.uid) {
      const setStoredUserAndSellerData = async userUid => {
        const storedUserData = await getUserData(userUid)
        const storedSellerData = await getSellerData(userUid)

        if (storedUserData) {
          setUser(storedUserData)
        }
        if (storedSellerData) {
          setSeller(storedSellerData)
        }
        setPageLoading(false)
      }

      setStoredUserAndSellerData(userData.uid)
    } else {
      const guestData =
        JSON.parse(localStorage.getItem('@guestData')) || ''

      if (guestData) {
        setGuestInfo(guestData)
      }
      setPageLoading(false)
    }
  }, [])

  useEffect(() => {
    setHasSellerAccount(seller instanceof Object)
  }, [seller])

  const updateUserInfo = (updatedInfo = {}) => {
    const userUid = user?.uid
    return new Promise(async (resolve, reject) => {
      try {
        const userRef = doc(db, 'users', userUid)
        await updateDoc(userRef, updatedInfo)

        setUser(prevUser => ({
          ...prevUser,
          ...updatedInfo
        }))
        resolve(true)
      } catch (error) {
        reject(false)
      }
    })
  }

  const updateDeliveryAddress = async ({
    city,
    state,
    postalCode,
    streetAddress
  }) => {
    await updateUserInfo({
      deliveryAddress: {
        city: city.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        streetAddress: streetAddress.trim()
      }
    })
  }

  async function signIn(email, password) {
    setLoggingIn(true)

    const returnObject = {
      credentialsError: ''
    }
    await signInWithEmailAndPassword(auth, email, password)
      .then(async value => {
        const uid = value.user.uid

        const userData = await getUserData(uid)

        saveUserLoginInfo(email, uid)
        setUser(userData)
        navigate('/')
      })
      .catch(error => {
        returnObject.credentialsError = getAuthErrorMessage(error.code)
      })

    setLoggingIn(false)

    return returnObject
  }

  async function signUp(email, password, fullName) {
    const returnObject = {
      emailError: '',
      passwordError: ''
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async value => {
        const { email, uid } = value.user
        saveUserLoginInfo(email, uid)

        const newUser = {
          email,
          uid,
          purchasedProducts: [],
          list: [],
          cart: [],
          creditCardsInfo: [],
          profileConfiguration: {
            imgUrl: '',
            fullName: fullName
          },
          deliveryAddress: {
            streetAddress: '',
            city: '',
            state: '',
            postalCode: ''
          }
        }
        setUser(newUser)
        setSeller(false)

        const userRef = doc(db, 'users', uid)
        await setDoc(userRef, newUser)

        toast.success('Registrado com sucesso!', {
          toastId: 'registered'
        })
        navigate('/')
      })
      .catch(error => {
        const errorMessage = getCreateAccountErrorMessage(error.code)
        returnObject.emailError = errorMessage.email
        returnObject.passwordError = errorMessage.password
      })

    return returnObject
  }

  async function registerSeller(cnpj, receivingCreditCard, brandName) {
    return new Promise((resolve, reject) => {
      const newSeller = {
        cnpj,
        receivingCreditCard,
        brandName,
        sellerUid: user?.uid,
        products: []
      }
      setSeller(newSeller)

      const sellerRef = doc(db, 'sellers', user?.uid)
      setDoc(sellerRef, newSeller)
        .then(async () => {
          const brandNames = doc(db, 'sellers', 'brandNames')
          await updateDoc(brandNames, {
            brandNames: arrayUnion(brandName)
          })
          resolve('Registrado com sucesso!')
        })

        .catch(error => {
          console.log(error)
          reject('Erro ao se cadastrar como um vendedor!')
        })
    })
  }

  function logout() {
    localStorage.removeItem('@userData')
    setUser(false)
    setSeller(false)
    toast.success('Você foi desconectado com sucesso!', {
      toastId: 'loggedOut'
    })
  }

  function saveUserLoginInfo(email, uid) {
    const userData = {
      email,
      uid
    }
    localStorage.setItem('@userData', JSON.stringify(userData))
  }

  async function addNewCreditCard(cardInfo) {
    const userUid = user?.uid
    if (!userUid) {
      return
    }

    const userRef = doc(db, 'users', userUid)

    await addDoc(collection(userRef, 'creditCards'), cardInfo).then(
      snapshot => {
        const updatedCreditCardsInfo = [
          ...(user?.creditCardsInfo || []),
          {
            ownerName: cardInfo?.ownerName,
            cardNumberLastFoursDigits: cardInfo?.cardNumber.slice(-4),
            id: snapshot.id,
            cardBrand: 'Fake brand'
          }
        ]
        updateUserInfo({
          creditCardsInfo: updatedCreditCardsInfo
        })
      }
    )
  }

  const contextValue = {
    addNewCreditCard,
    updateUserInfo,
    updateDeliveryAddress,
    userSigned: !!user,
    user,
    setUser,
    seller,
    setSeller,
    hasSellerAccount,
    userUid: user?.uid,
    creditCardsInfo: user?.creditCardsInfo,
    guestInfo,
    setGuestInfo,
    signIn,
    signUp,
    registerSeller,
    logout,
    pageLoading,
    loggingIn,
    setLoggingIn,
    registering,
    setRegistering
  }

  if (pageLoading) {
    return <Loading />
  }

  if (firebaseError) {
    return <FirebaseError />
  }
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export { AuthContext }
